// import React from "react";

// import { Box } from "@mui/material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { NoteState } from "../../context/NoteContext";
import { AuthState } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
const AddNote = () => {
  const { token } = AuthState();
  console.log(token);
  const { state } = useLocation();
  const { PostNote, UpdateNote } = NoteState();
  const [formData, setFormData] = useState({
    title: state?.title || "",
    description: state?.description || "",
    noteId: state?.id || "",
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  console.log(token, " at AddNote");
  const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (formData.noteId) {
        // Update existing note
        await UpdateNote(
          formData.noteId,
          { title: formData.title, description: formData.description },
          token
        );
        navigate("/note/see"); // Redirect to the notes list after updating
      } else {
        // Add new note
        await PostNote(
          { title: formData.title, description: formData.description },
          token
        );
        navigate("/note/see"); // Redirect to the notes list after adding
      }
    } catch (error) {
      console.error("Error occurred while saving the note:", error);
      alert("Something went wrong, please try again.");
    }
  };
  return (
    <Box>
      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-title">Title</InputLabel>
        <OutlinedInput
          id="outlined-adornment-title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          label="Title"
        />
      </FormControl>

      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
        <TextField
          id="outlined-adornment-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
          variant="outlined"
          label="Description"
          fullWidth
        />
      </FormControl>

      <Button onClick={handleSubmit}>
        {formData.noteId ? "Update Note" : "Add Note"}
      </Button>

      {/* Displaying all added notes */}
      {/* <Box sx={{ mt: 3 }}>
        <h3>Saved Notes:</h3>
        {note.map((note) => (
          <Box
            key={note.id}
            sx={{
              mb: 2,
              padding: 2,
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <h4>{note.title}</h4>
            <p>{note.description}</p>
          </Box>
        ))}
      </Box> */}
    </Box>
  );
};

export default AddNote;
