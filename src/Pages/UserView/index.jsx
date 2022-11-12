import { Button } from "antd";
import moment from "moment/moment";
import "moment/locale/es";
import ScheduleList from "../../Components/Atom/ScheduleList";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import db from "../../Config/firebase";
import "./style.css";
import { useAuth } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const UserView = ({ data }) => {
  const currentDay = moment().locale("es").format("dddd, D [de] MMM");
  const { currentUser, userData, logOut } = useAuth();

  const updateTurns = async () => {
    const oldTurn = data.filter((turn) => turn.time === currentUser.turn)[0];
    const newCapacity = oldTurn.capacity + 1;

    const turnRef = doc(db, "turns", oldTurn.id);
    await updateDoc(turnRef, {
      capacity: newCapacity,
    });
  };

  const updateUser = async () => {
    const userRef = doc(db, "users", currentUser.uID);
    await updateDoc(userRef, {
      turn: "",
      assistanceId: "",
    });
  };

  const deleteAssistance = async () => {
    const assistance = doc(db, "assistance", currentUser.assistanceId);
    await deleteDoc(assistance);
  };

  const handleClick = () => {
    updateTurns();
    updateUser();
    deleteAssistance();
  };

  if (!userData) {
    return <Navigate to="/login" />;
  }

  if (currentUser) {
    if (currentUser.turn !== "") {
      return (
        <div className="user-view-container">
          <h1 className="user-view-item">{currentDay ?? "-"}</h1>
          <div className="user-view-item">
            <h2>Tienes un turno asignado:</h2>
            <p>{currentUser.turn ?? "-"}</p>
          </div>

          <div className="user-view-cancel">
            <Button onClick={handleClick} type={"danger"}>
              Cancelar Reserva
            </Button>
            <button onClick={logOut}>Cerrar Sesion</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="user-view-container">
          <h1 className="user-view-item">{currentDay ?? "-"}</h1>
          <button onClick={logOut}>Cerrar Sesion</button>
          <div className="user-view-item">
            <ScheduleList userId={currentUser.uID} codigo={currentUser.codigo} schedules={data} />
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
