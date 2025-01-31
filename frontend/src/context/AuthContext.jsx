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
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // If a token is found in localStorage, set the user to be authenticated
    if (storedToken && storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
      setToken(storedToken);
    } else {
      setIsAuthenticated(false);
      setRedirectToLogin(true);

      // Redirect to login page if no token
    }

    console.log("Authentication state changed: ", isAuthenticated);
  }, []);
  const login = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3500/api/user/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
      setUser(user);
      setLoading(false);
      setToken(token);
      console.log(user, token, isAuthenticated);

      toast.success(`Welcome, ${user.username}! Login successful!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Login failed! Please try again.";
      setError(errorMessage);
      setLoading(false);

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
    setRedirectToLogin(true); // Redirect to login page after logout
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
export const AuthState = () => {
  return useContext(AuthContext);
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider };
