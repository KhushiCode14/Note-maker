import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// import ProtectedRoute from "./Routes/ProtectedRoute";
import LandingRoutes from "./Routes/LandingPageRoute";
import AuthRoutes from "./Routes/AuthRoutes";
import NoteRoutes from "./Routes/NoteRoute";
// import ProtectedRoute from "./Routes/ProtectedRoute";
// import LandingPage from "./pages/LandingPage";
// import ProtectedRoute from "./Routes/ProtectedRoute";

const App = () => {
  const router = createBrowserRouter([
    // Protected Route for LandingPage
    // <ProtectedRoute key={"landing"}>
    //   <LandingPage />
    // </ProtectedRoute>,
    LandingRoutes,
    // Authentication Routes
    AuthRoutes,
    // Notes Management Routes
    NoteRoutes,
    // Catch-all: Redirect unknown routes to Login
    {
      path: "*",
      element: <Navigate to="/auth/login" />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
