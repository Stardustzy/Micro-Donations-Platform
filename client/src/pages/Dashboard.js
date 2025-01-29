import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <h2>Welcome, {user?.name}!</h2>
      <p>Email: {user?.email}</p>
      <p>Here you can manage your donations and causes.</p>
    </div>
  );
};

export default Dashboard;
