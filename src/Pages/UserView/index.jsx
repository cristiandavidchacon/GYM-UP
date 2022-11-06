import { Button } from "antd";
import moment from "moment/moment";
import ScheduleList from "../../Components/Atom/ScheduleList";
import "./style.css";

const UserView = ({ data }) => {
  const currentDay = moment().format("dddd");

  if (data.length > 0) {
    return (
      <div className="user-view-container">
        <div className="user-view-item">{currentDay ?? "-"}</div>
        <div className="user-view-item">
          <ScheduleList schedules={data} />
        </div>
        <div className="user-view-cancel">
          <Button type={"danger"}>Cancelar Reserva</Button>
        </div>
      </div>
    );
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
