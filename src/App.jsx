import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import AdminView from "./Pages/AdminView";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import RegisterView from "./Pages/RegisterView";
import UserViewWrapper from "./Pages/UserView/wrapper";
import "./gestion.css"
import "./global.css"

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/gestionar-mis-reservas/:userid"
            element={<UserViewWrapper />}
          />
          <Route path="/registrar-ingreso" element={<RegisterView />} />
          <Route path="/administrar-reservas" element={<AdminView />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div>NOT FOUND</div>} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
