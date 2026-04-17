import { Navigate } from "react-router-dom";

const RoleRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !allowedRoles.includes(user.roles[0])) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RoleRoute;