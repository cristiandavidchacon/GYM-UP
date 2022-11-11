import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminView from "./Pages/AdminView";
import RegisterView from "./Pages/RegisterView";
import UserViewWrapper from "./Pages/UserView/wrapper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/gestionar-mis-reservas/:userid"
          element={<UserViewWrapper />}
        />
        <Route path="/registrar-ingreso" element={<RegisterView />} />
        <Route path="/administrar-reservas" element={<AdminView />} />
        <Route path="*" element={<div>NOT FOUND</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
