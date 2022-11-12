import { Button } from "antd";
import moment from "moment/moment";
import "moment/locale/es";
import ScheduleList from "../../Components/Atom/ScheduleList";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import db from "../../Config/firebase";
import "./style.css";
import { useAuth } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";

const UserView = ({ user, data }) => {
  const currentDay = moment().locale("es").format("dddd, D [de] MMM");
  const { currentUser, userData, logOut } = useAuth();

  const updateTurns = () => {
    const oldTurn = data.filter((turn) => turn.time === user.turn)[0];
    const newCapacity = oldTurn.capacity + 1;

    const turnRef = doc(db, "turns", oldTurn.id);
    updateDoc(turnRef, {
      capacity: newCapacity,
    });
  };

  const updateUser = () => {
    const userRef = doc(db, "users", user.id);
    updateDoc(userRef, {
      turn: "",
      assistanceId: "",
    });
  };

  const deleteAssistance = () => {
    const assistance = doc(db, "assistance", user.assistanceId);
    deleteDoc(assistance);
  };

  const handleClick = () => {
    deleteAssistance();
    updateTurns();
    updateUser();
  };

  if (!userData) {
    return <Navigate to="/login" />;
  }

  console.log(currentUser);

  if (user) {
    if (user.turn !== "") {
      return (
        <div className="user-view-container">
          <h1 className="user-view-item">{currentDay ?? "-"}</h1>
          <div className="user-view-item">
            <h2>Tienes un turno asignado:</h2>
            <p>{user.turn ?? "-"}</p>
          </div>
          <div className="user-view-cancel">
            <Button onClick={handleClick} type={"danger"}>
              Cancelar Reserva
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="user-view-container">
          <h1 className="user-view-item">{currentDay ?? "-"}</h1>
          <button onClick={logOut}>Cerrar Sesion</button>
          <div className="user-view-item">
            <ScheduleList userId={user.id} schedules={data} />
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="loading">
        <div>
          <p className="loading-label">Cargando</p>
        </div>
        <div className="loading-circle">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
};

export default UserView;
