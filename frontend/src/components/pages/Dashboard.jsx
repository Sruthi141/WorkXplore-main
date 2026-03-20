
import { useSelector } from "react-redux";
import RecruiterDashboard from "../dashboard/RecruiterDashboard.jsx";
import UserDashboard from "../dashboard/UserDashboard.jsx";

function Dashboard() {
  const { user } = useSelector((store) => store.auth);

  return user.role === "recruiter" ? <RecruiterDashboard /> : <UserDashboard />;
}

export default Dashboard;
