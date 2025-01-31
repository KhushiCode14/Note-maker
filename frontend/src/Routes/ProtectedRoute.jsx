import { Navigate } from "react-router-dom";

import PropTypes from "prop-types";
import { AuthState } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, redirectToLogin } = AuthState();

  if (redirectToLogin) {
    return <Navigate to="/auth/login" />;
  }

  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
