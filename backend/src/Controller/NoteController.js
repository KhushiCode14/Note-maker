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
  try {
    const note = await Note.findById(id).populate("userId", "-password");
    if (!note) {
      console.log("note not found");
      return res.status(404).json({ message: "Note not found" });
    }
  } catch (err) {
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
  } catch (err) {
    console.error("Error updating note:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
export { CreateNote, GetNote, UpdateNote };
