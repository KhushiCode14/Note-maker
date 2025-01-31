import { useEffect } from "react";
import { NoteState } from "../../context/NoteContext";
import { AuthState } from "../../context/AuthContext";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
function SeeNote() {
  const { note, GetAllNote, DeleteNote } = NoteState();
  const { token, isAuthenticated } = AuthState();
  console.log(isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      GetAllNote(token); // Fetch all notes on component mount
    }
  }, [token, isAuthenticated, GetAllNote]);
  const navigate = useNavigate();
  const handleUpdate = (id, title, description) => {
    navigate("/note/add", { state: { title, description, id } });
    // UpdateNote(id, updatedData, token); // Update the note with new data
  };

  const handleDelete = (id) => {
    DeleteNote(id, token); // Delete the note
  };

  return (
    <Box className="max-w-3xl mx-auto p-6 h-auto">
      <Typography
        variant="h4"
        className="text-center mb-6 font-bold text-gray-800"
      >
        All Notes
      </Typography>
      <Box className="space-y-6 flex flex-col">
        {note.length > 0 ? (
          note.map((n) => (
            <Card
              variant="outlined"
              key={n._id}
              className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              sx={{
                // background: "#fff",
                borderRadius: "12px",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                maxWidth: "600px",
                // boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  {n.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#555",
                    marginTop: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "100%",
                  }}
                >
                  {n.description}
                </Typography>
              </CardContent>
              {/* box at end of card adn right corner */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  alignSelf: "flex-end",
                }}
              >
                <IconButton
                  onClick={() => handleUpdate(n._id, n.title, n.description)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(n._id)} color="primary">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          ))
        ) : (
          <Typography className="text-center text-gray-500">
            No notes available.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default SeeNote;
