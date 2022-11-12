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

  const [tempDataSource, setTempDataSource] = useState([]);
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
      setTempDataSource(items);
    });

    return () => {
      subAssistance();
    };
  }, []);

  const getUser = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };

  useEffect(() => {
    if (tempDataSource.length > 0 && tempDataSource[0].name.length === 0) {
      tempDataSource.map((currentTempData) => {
        getUser(currentTempData.userId).then((userData) => {
          const completeData = {
            ...currentTempData,
            name: userData?.name,
            email: userData?.email,
            turn: userData?.turn,
          };
          setDataSource((dataSource) => [...dataSource, completeData]);
        });
      });
    }
  }, [tempDataSource]);

  return <AssistanceTable data={dataSource} columnHeaders={defaultColumns} />;
};

export default AssistanceTableWrapper;
