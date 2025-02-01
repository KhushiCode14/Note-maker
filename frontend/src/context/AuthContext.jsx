import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(false); // For tracking loading state
  const [error, setError] = useState(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  // Initialize navigate to redirect

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      setIsAuthenticated(true);
      setUser(user);
      setToken(token);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  const BaseUrl = import.meta.env.VITE_BACKEND_URL;
  console.log(BaseUrl);
  // console.log(BaseUrl);
  const login = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BaseUrl}/api/user/login`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
      setRedirectToLogin(false);
      setUser(user);
      setLoading(false);
      setToken(token);
      console.log(user, token, isAuthenticated);
      console.log(response);
      toast.success(`Welcome, ${user.username}! Login successful!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      const errorMessage = err.message || "Login failed! Please try again.";
      setError(errorMessage);
      setLoading(false);
      console.log(err);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setRedirectToLogin(true);
    toast.info("You have been logged out!", {
      position: "top-right",
      autoClose: 2000,
    });
  };
  const register = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${BaseUrl}/api/user/register`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token, user } = response.data;

      // Save token & user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      setRedirectToLogin(false);

      toast.success(`Welcome, ${user.username}! Registration successful!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed! Please try again."
      );
      toast.error(error, { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        register,
        loading,
        error,
        token,
        redirectToLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const AuthState = () => {
  return useContext(AuthContext);
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, AuthState };
