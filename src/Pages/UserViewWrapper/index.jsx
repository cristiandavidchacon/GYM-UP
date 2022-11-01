import React from "react";
import UserView from "../../Components/Template/UserView";
import firebase from '../../Config/firebase'

const UserViewWrapper = () => {

  

  const data = [
    {
      franja: "6:00 - 7:00",
      aforo: 60,
      contador: 0,
      day: "Lunes",
    },
    {
      franja: "7:00 - 8:00",
      aforo: 60,
      contador: 0,
      day: "Lunes",
    },
    {
      franja: "8:00 - 9:00",
      aforo: 60,
      contador: 0,
      day: "Lunes",
    },
  ];

  return <UserView data={data} />;
};

export default UserViewWrapper;
