import CustomButton from "../Schedule";
import "./style.css";

const ScheduleList = ({schedules}) => {

  for (let i = 0; i < schedules.length; i++) {
    const schedule = schedules[i];

    const newSchedule = {...schedule, id:i};
    schedules[i] = newSchedule;
    
  }

  const schedulesList = schedules.map((currentSchedule) => {

    console.log('schedule',currentSchedule)

    return (
      <div key={currentSchedule.id} className="schedule-item">
      <Schedule data={currentSchedule}/>
      </div>
    );
  });

  return <div className="schedule-container">{schedulesList}</div>;
};

export default ScheduleList;
