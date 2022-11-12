import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import AssistanceTableWrapper from "../../Components/Template/AssistanceTable/wrapper";

const AdminView = () => {
  const { userData, logOut } = useAuth();

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div>
        <AssistanceTableWrapper />
      </div>
      <div>
        <button onClick={logOut}>LogOut</button>
      </div>
    </div>
  );
};

export default AdminView;
