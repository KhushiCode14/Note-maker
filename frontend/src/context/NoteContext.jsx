import { createContext, useCallback, useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Create the Note Context
const NoteContext = createContext();

// NoteProvider component to wrap your app
export const NoteProvider = ({ children }) => {
  const [note, setNote] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const BaseUrl = import.meta.env.VITE_BACKEND_URL;
  // Post note function
  const PostNote = async (formData, token) => {
    if (!token) {
      console.error("No token found! API call aborted.");
      return;
    }
    try {
      const response = await axios.post(`${BaseUrl}/api/note`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        // If the post is successful, update the notes state
        setNote((prevNotes) => [...prevNotes, response.data]);
        console.log("Note added successfully:", response.data);
      } else {
        console.error("Error:", response);
      }
    } catch (err) {
      console.error("Error occurred while posting the note:", err);
    }
  };

  // Get a single note by ID
  const GetNote = async (id, token) => {
    if (!token) {
      console.error("No token found! API call aborted.");
      return;
    }

    try {
      const response = await axios.get(`${BaseUrl}/api/note/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setNote([response.data]); // Set only the specific note
        console.log("Note added successfully:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // Get all notes with memoization
  const GetAllNote = useCallback(async (token) => {
    if (!token) {
      console.error("No token found! API call aborted.");
      return;
    }

    try {
      const response = await axios.get(`${BaseUrl}/api/note`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setNote(response.data); // Replace with all notes
        console.log("Note getAlNote successfully:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  // Update a note by ID
  const UpdateNote = async (id, updatedData, token) => {
    if (!token) {
      console.error("No token found! API call aborted.");
      return;
    }

    try {
      const response = await axios.put(
        `${BaseUrl}/api/note/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNote((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, ...updatedData } : note
        )
      );
      console.log("Note response successfully:", response.data);
    } catch (e) {
      console.error("Error:", e);
    }
  };

  // Delete a note by ID
  const DeleteNote = async (id, token) => {
    if (!token) {
      console.error("No token found! API call aborted.");
      return;
    }

    try {
      const response = await axios.delete(`${BaseUrl}/api/note/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        // Remove the deleted note from the state
        setNote((prevNotes) => prevNotes.filter((note) => note._id !== id));
        console.log("Note delete successfully:", response.data);
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        PostNote,
        note,
        title,
        setTitle,
        description,
        setDescription,
        GetAllNote,
        GetNote,
        UpdateNote,
        DeleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

// Prop types for NoteProvider
NoteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use NoteContext
const NoteState = () => {
  return useContext(NoteContext);
};

export { NoteContext, NoteState };
