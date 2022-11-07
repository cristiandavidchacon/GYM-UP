import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserViewWrapper from "./Pages/UserView/wrapper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/administrar-reservas/:userid"
          element={<UserViewWrapper />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
