import { Button } from "antd";
import moment from "moment/moment";
import "moment/locale/es";
import ScheduleList from "../../Components/Atom/ScheduleList";
import { updateDoc, doc } from "firebase/firestore";
import db from "../../Config/firebase";
import "./style.css";

const UserView = ({ user, data }) => {
  const currentDay = moment().locale("es").format("dddd, D [de] MMM");

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
    });
  };

  const handleClick = () => {
    updateTurns();
    updateUser();
  };

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
