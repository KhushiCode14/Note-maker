import Note from "../components/Note/Note";
import ProtectedRoute from "./ProtectedRoute";

const NoteRoutes = {
  path: "/note/*",
  element: (
    <ProtectedRoute>
      <Note />
    </ProtectedRoute>
  ),
};

export default NoteRoutes;
