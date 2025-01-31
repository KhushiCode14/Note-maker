import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "./components/Auth/Auth";

import Note from "./components/Note/Note";
const App = () => {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          {/* Redirect root path to login */}
          <Route path="/" element={<Navigate to="/auth/login" />} />

          {/* Authentication Routes */}
          <Route path="/auth/*" element={<Auth />} />

          {/* Notes Management Routes */}
          <Route path="/note/*" element={<Note />} />

          {/* Catch-all: Redirect unknown routes to Login */}
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
