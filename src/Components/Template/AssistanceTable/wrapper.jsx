import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import db from "../../../Config/firebase";
import AssistanceTable from ".";
import moment from "moment";
import { dateFormat } from "../../../Config/moment.format";

const AssistanceTableWrapper = () => {
  const defaultColumns = [
    {
      key: "name",
      label: "Nombre",
    },
    {
      key: "email",
      label: "Correo",
    },
    {
      key: "turn",
      label: "Reserva",
    },
    {
      key: "assist",
      label: "Asistió",
    },
  ];

  const defaultRows = [
    {
      key: "1",
      name: "-",
      email: "-",
      turn: "-",
      assist: "-",
    },
  ];

  const [dataSource, setDataSource] = useState([]);
  const curentDay = moment().format(dateFormat);

  const assistanceRef = collection(db, "assistance");
  const assistanceQuery = query(assistanceRef, where("day", "==", curentDay));

  /**
   * Get assistance by day
   */
  useEffect(() => {
    const subAssistance = onSnapshot(assistanceQuery, (querySnapshot) => {
      const items = [];
      let getKey = 1;
      querySnapshot.forEach((doc) => {
        const tempData = doc.data();
        const tempAssist = tempData === true ? "Si" : "NO";
        const data = {
          key: getKey,
          name: "",
          email: "",
          turn: "",
          assist: tempAssist,
          userId: tempData.userId,
        };
        getKey += 1;
        items.push(data);
      });
      setDataSource(items);
    });

    return () => {
      subAssistance();
    };
  }, []);

  useEffect(() => {
    // data is incomplete
    if (dataSource.length > 0 && dataSource[0].name.length === 0) {
      const completeData = dataSource.map(async (current) => {
        const docRef = doc(db, "users", current.userId);
        const docSnap = await getDoc(docRef);
        const docData = await docSnap.data();

        const newData = {
          ...current,
          name: docData?.name,
          email: docData?.email,
          turn: docData?.turn,
        };
        return newData;
      });
      console.log(completeData);
    }
  }, [dataSource]);

  return <AssistanceTable data={dataSource} columnHeaders={defaultColumns} />;
};

export default AssistanceTableWrapper;
