import { Button } from "antd";
import { updateDoc, doc, collection, addDoc } from "firebase/firestore";
import moment from "moment/moment";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../../Config/firebase";
import { dateFormat } from "../../../Config/moment.format";

const Schedule = ({ userId, codigo, data }) => {
  const user = useParams("userid")?.userid;
  const assistanceId = useRef("");

  const createAssistance = async () => {
    const day = moment().format(dateFormat);
    const newAssistance = {
      assist: false,
      day,
      userId: user,
      codigo: codigo
    };
    const assistanceRef = collection(db, "assistance");
    const assistance = await addDoc(assistanceRef, newAssistance);
    assistanceId.current = assistance?.id;
  };

  const updateTurns = async () => {
    const newCapacity = data.capacity - 1;

    const turnRef = doc(db, "turns", data.id);
    await updateDoc(turnRef, {
      capacity: newCapacity,
    });
  };

  const updateUser = async () => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      turn: data.time,
      assistanceId: assistanceId.current,
    });
  };

  const handleClick = async () => {
    await createAssistance();
    await updateTurns();
    await updateUser();
  };

  const message = `${data.time} ${data.capacity} Lugares disponibles`;

  return (
    <Button onClick={handleClick} type="primary">
      {message}
    </Button>
  );
};

export default Schedule;
