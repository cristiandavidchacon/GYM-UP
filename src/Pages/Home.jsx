import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminView from "./AdminView";
import RegisterView from "./RegisterView";

function Home() {
  const { currentUser } = useAuth();
  return (
    <div>
      {currentUser?.role === "U" ? (
        <Navigate to="/gestionar-mis-reservas/test" />
      ) : currentUser?.role === "A" ? (
        <AdminView />
      ) : (
        <RegisterView />
      )}
    </div>
  );
}

export default Home;
