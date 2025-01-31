import { Navigate } from "react-router-dom";
import { AuthState } from "../context/AuthContext";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = AuthState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists in localStorage and update the loading state
    if (localStorage.getItem("token")) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state until we confirm auth status
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
