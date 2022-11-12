import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const AdminView = () => {
  const { userData, logOut } = useAuth();

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div>AdminView</div>
      <button onClick={logOut}>LogOut</button>
    </>
  );
};

export default AdminView;
