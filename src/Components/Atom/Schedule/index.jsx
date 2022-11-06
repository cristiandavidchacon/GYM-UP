import { Button } from "antd";

const Schedule = ({ data }) => {
  const message = `${data.time} ${data.capacity} Lugares disponibles`;

  return <Button type="primary">{message}</Button>;
};

export default Schedule;
