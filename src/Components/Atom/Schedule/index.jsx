import { Button } from "antd";

const Schedule = ({data}) => {
  const available = data.aforo - data.contador;
  const message = `${data.franja} ${available} Lugares disponibles`;

  return <Button type='primary'>
    {message}
  </Button>;
};

export default Schedule;
