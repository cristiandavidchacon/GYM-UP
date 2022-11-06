import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import UserView from ".";
import db from "../../Config/firebase";

const UserViewWrapper = () => {
  const collectionRef = collection(db, "turns");

  const [turns, setTurns] = useState([]);

  useEffect(() => {
    const sub = onSnapshot(collectionRef, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setTurns(items);
    });

    return () => {
      sub();
    };
  }, []);

  return <UserView data={turns} />;
};

export default UserViewWrapper;
