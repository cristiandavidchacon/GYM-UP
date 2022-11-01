import { Button } from "antd";
import moment from "moment/moment";
import ScheduleList from "../../Atom/ScheduleList";
import "./style.css";

const UserView = ({ data }) => {
  const currentDay = moment().format("dddd");

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
};

export default UserView;
