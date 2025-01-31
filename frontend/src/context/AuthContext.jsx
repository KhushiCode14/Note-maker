import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // For tracking loading state
  const [error, setError] = useState(null);
  const login = (formData) => {
    setLoading(true);
    setError(null); // Reset error on new login attempt

    toast.promise(
      axios.post("http://localhost:3500/api/user/login", formData, {
        headers: { "Content-Type": "application/json" },
      }),
      {
        pending: "Logging you in...",
        success: (response) => {
          const { token, user } = response.data;
          // Store token and user info after successful login
          localStorage.setItem("token", token);
          setIsAuthenticated(true);
          setUser(user); // Update user data
          setLoading(false); // Reset loading state
          return `Welcome, ${user.username}! Login successful!`;
        },
        error: (err) => {
          const errorMessage =
            err.response?.data?.error || "Login failed! Please try again.";
          setError(errorMessage);
          setLoading(false); // Reset loading state
          return errorMessage;
        },
      },
      {
        position: "top-right",
        autoClose: 3000,
      }
    );
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
  };
  const register = async (formData) => {
    setLoading(true);
    setError(null); // Reset error on new registration attempt

    toast.promise(
      axios.post("http://localhost:3500/api/user/register", formData, {
        headers: { "Content-Type": "application/json" },
      }),
      {
        pending: "Registering your account...",
        success: (response) => {
          const { token, user } = response.data;
          login(token, user); // Auto-login after successful registration
          return `Welcome, ${user.username}! Registration successful!`;
        },
        error: (err) => {
          const errorMessage =
            err.response?.data?.error ||
            "Registration failed! Please try again.";
          setError(errorMessage);
          return errorMessage;
        },
      },
      {
        position: "top-right",
        autoClose: 3000,
      }
    );

    setLoading(false); // Reset loading state
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, register, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const AuthState = () => {
  return useContext(AuthContext);
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider };
