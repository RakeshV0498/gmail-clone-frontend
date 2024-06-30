import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ component }) => {
  const isAuthenticated = Boolean(localStorage.getItem("Authenticated"));
  if (isAuthenticated) {
    return component;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
