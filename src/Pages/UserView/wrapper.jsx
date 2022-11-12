import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserView from ".";
import { useAuth } from "../../../context/AuthContext";
import db from "../../Config/firebase";

const UserViewWrapper = () => {
  const [turns, setTurns] = useState([]);
  const [loggedUser, setLoggedUser] = useState({});
  const {currentUser}=useAuth()
  const userId = currentUser.codigo;

  // const usersRef = collection(db, "users");
  // const userQuery = query(usersRef, where("userId", "==", userId));

  const turnsRef = collection(db, "turns");
  const turnQuery = query(turnsRef, orderBy("turnId"));

  /**
   * Get info of logged user
   */

  // useEffect(() => {
  //   const subUser = onSnapshot(userQuery, (querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       const temData = doc.data();
  //       const data = {
  //         ...temData,
  //         id: doc.id,
  //       };
  //       setLoggedUser(data);
  //     });
  //   });
  //   return () => {
  //     subUser();
  //   };
  // }, []);

  /**
   * Subscribe to all the turns
   */
  useEffect(() => {
    const subTurns = onSnapshot(turnQuery, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        const tempData = doc.data();
        const data = {
          ...tempData,
          id: doc.id,
        };
        if (data.capacity > 0) {
          items.push(data);
        }
      });
      setTurns(items);
    });

    return () => {
      subTurns();
    };
  }, []);

  return <UserView data={turns} />;
};

export default UserViewWrapper;
