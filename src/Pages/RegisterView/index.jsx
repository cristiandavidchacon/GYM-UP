import { Button, Form, Input } from "antd";
import {
  collection,
  onSnapshot,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import moment from "moment/moment";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import db from "../../Config/firebase";
import { dateFormat } from "../../Config/moment.format";

const RegisterView = () => {
  const [userId, setUserId] = useState("");
  const [assistanceId, setAssistanceId] = useState("");
  const currentDay = moment().format(dateFormat);
  const { userData, logOut } = useAuth();

  useEffect(() => {
    const assistanceRef = collection(db, "assistance");
    const assistanceQuery = query(
      assistanceRef,
      where("codigo", "==", userId),
      where("day", "==", currentDay)
    );
    const subAssistance = onSnapshot(assistanceQuery, (querySnapshot) => {
      querySnapshot.forEach((document) => {
        setAssistanceId(document.id);
      });
    });

    return () => {
      if (userId.length > 0) {
        subAssistance();
      }
    };
  }, [userId]);

  // useEffect(() => {
  //   if (assistanceId.length > 0) {
  //     const assistanceRef = doc(db, "assistance", assistanceId);
  //     updateDoc(assistanceRef, {
  //       assist: true,
  //     });
  //   }
  // }, [assistanceId]);

  // const onFinish = (values) => {
  //   setUserId(values.userId);
  //   alert("Registro exitoso");
  // };




  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (assistanceId.length > 0) {
      try {
        const assistanceRef = doc(db, "assistance", assistanceId);
        await updateDoc(assistanceRef, {
          assist: true,
        });
        setUserId(values.userId);
        alert("Registro exitoso");
      } catch (error) {
        console.log(error);
        alert("Error al registrar");
      }
    }
  };

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Asistencias</h1>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        // onFinish={onFinish}
        onSubmit = {handleSubmit}
        // onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item
          label="Ingrese el Id del usuario"
          name="userId"
          rules={[
            {
              required: true,
              message: "Por favor ingrese un numero de identificacion",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Validar Asistencia
          </Button>
          <button onClick={logOut}>Logout</button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default RegisterView;
