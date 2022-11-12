import Schedule from "../Schedule";
import "./style.css";

const ScheduleList = ({ userId, codigo, schedules }) => {
  const schedulesList = schedules.map((currentSchedule) => {
    return (
      <div key={currentSchedule.turnId} className="schedule-item">
        <Schedule userId={userId} data={currentSchedule} codigo={codigo} />
      </div>
    );
  });

  return <div className="schedule-container">{schedulesList}</div>;
};

export default ScheduleList;
