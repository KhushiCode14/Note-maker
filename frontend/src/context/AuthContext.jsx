import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const login = (token, userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem("token", token);
  };
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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
