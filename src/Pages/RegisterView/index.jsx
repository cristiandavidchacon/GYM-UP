import { Button, Form, Input } from "antd";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import moment from "moment/moment";
import { useRef } from "react";
import db from "../../Config/firebase";
import { dateFormat } from "../../Config/moment.format";

const RegisterView = () => {
  const userId = useRef("");
  const assistanceId = useRef("");
  const currentDay = moment().format(dateFormat);

  const assistanceRef = collection(db, "assistance");
  const assistanceQuery = query(
    assistanceRef,
    where("userId", "==", userId.current),
    where("day", "==", currentDay)
  );

  const getAssistance = async () => {
    const subUser = onSnapshot(assistanceQuery, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        assistanceId.current = doc?.id;
        console.log("entro");
      });
    });

    await subUser();
    console.log(assistanceId.current);
  };

  const onFinish = async (values) => {
    userId.current = values.userId;
    await getAssistance();
    //actualizar
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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
      </Form.Item>
    </Form>
  );
};
export default RegisterView;
