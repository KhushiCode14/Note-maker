import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute component
import LandingPage from "../pages/LandingPage";

const LandingRoutes = {
  path: "/",
  element: (
    <ProtectedRoute>
      <LandingPage />
    </ProtectedRoute>
  ),
};

export default LandingRoutes;
