import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterView from "./Pages/RegisterView";
import UserViewWrapper from "./Pages/UserView/wrapper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/administrar-reservas/:userid"
          element={<UserViewWrapper />}
        />
        <Route path="/registrar-ingreso" element={<RegisterView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
