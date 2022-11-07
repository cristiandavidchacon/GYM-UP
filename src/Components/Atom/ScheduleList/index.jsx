import Schedule from "../Schedule";
import "./style.css";

const ScheduleList = ({ userId, schedules }) => {
  const schedulesList = schedules.map((currentSchedule) => {
    return (
      <div key={currentSchedule.turnId} className="schedule-item">
        <Schedule userId={userId} data={currentSchedule} />
      </div>
    );
  });

  return <div className="schedule-container">{schedulesList}</div>;
};

export default ScheduleList;
