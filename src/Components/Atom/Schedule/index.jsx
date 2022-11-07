import { Button } from "antd";
import { updateDoc, doc } from "firebase/firestore";
import db from "../../../Config/firebase";

const Schedule = ({ userId, data }) => {
  const updateTurns = () => {
    const newCapacity = data.capacity - 1;

    const turnRef = doc(db, "turns", data.id);
    updateDoc(turnRef, {
      capacity: newCapacity,
    });
  };

  const updateUser = () => {
    const userRef = doc(db, "users", userId);
    updateDoc(userRef, {
      turn: data.time,
    });
  };

  const handleClick = () => {
    updateTurns();
    updateUser();
  };

  const message = `${data.time} ${data.capacity} Lugares disponibles`;

  return (
    <Button onClick={handleClick} type="primary">
      {message}
    </Button>
  );
};

export default Schedule;
