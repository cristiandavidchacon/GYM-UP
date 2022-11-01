import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserViewWrapper from "./Pages/UserViewWrapper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/administrar-reservas" element={<UserViewWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
