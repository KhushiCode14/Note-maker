import mongoose from "mongoose";
import Note from "../Models/NoteModel.js";
import User from "../Models/UserModel.js";
// @api/note
// @
const CreateNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "User not found, unauthorized" });
    }

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    // Create and save the new note
    const newNote = await new Note({
      title,
      description,
      userId: user._id,
    }).save();

    // Validate new note ID
    if (!mongoose.Types.ObjectId.isValid(newNote._id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    // Update user document with new note ID
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $push: { note: newNote._id } }
      //   { new: true } // Ensure we get the updated user document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Populate user details in the note response
    const populatedNote = await newNote.populate("userId", "-password");

    res.status(201).json(populatedNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
// @ /api/note/:id
const GetNote = async (req, res) => {
  const { id } = req.params;
  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Note ID" });
  }
  try {
    const note = await Note.findById(id).populate("userId", "-password");
    if (!note) {
      console.log("note not found");
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
// @api/note:id
const UpdateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, description },
      { new: true } // Ensure we get the updated note document
    );
    if (!updatedNote) {
      console.log("Note not found");
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
// delete note
// @api/note/:id
const DeleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      console.log("Note not found");
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
// @api/note/search?query=
// @api/note/search?query=
const SearchNote = async (req, res) => {
  const { query } = req.query; // Use 'query' instead of 'title' for a more flexible search term
  try {
    // Search for notes where either title or description matches the query
    const notes = await Note.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, // Case-insensitive search for title
        { description: { $regex: query, $options: "i" } }, // Case-insensitive search for description
      ],
    });

    if (notes.length === 0) {
      console.log("No notes found matching the query");
      return res.status(404).json({ message: "No notes found" });
    }

    res.status(200).json(notes);
  } catch (error) {
    console.error("Error searching notes:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
// @api/note/getAll
const GetAllNotes = async (req, res) => {
  try {
    // Fetch all notes and populate the user details
    const notes = await Note.find().populate("userId", "-password");

    // If no notes are found
    if (notes.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }

    // Return all notes
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching all notes:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export { CreateNote, GetNote, UpdateNote, DeleteNote, SearchNote, GetAllNotes };
