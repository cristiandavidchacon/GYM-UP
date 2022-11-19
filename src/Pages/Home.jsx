import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminView from "./AdminView";
import RegisterView from "./RegisterView";

function Home() {
  const { currentUser, userData, logOut } = useAuth();

  if (!userData) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      {currentUser?.role === "U" ? (
        <Navigate to={`/gestionar-mis-reservas/${currentUser.uID}`} />
      ) : currentUser?.role === "A" ? (
        <AdminView />
      ) : (
        currentUser?.role === "O" && <RegisterView />
      )}

      {/* <button onClick={logOut}>
      cerrar sesion 
    </button> */}
    </div>
  );
}
// rut
export default Home;
