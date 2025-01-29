import mongoose from "mongoose";
const { Schema } = mongoose;

// Define schema
const noteSchema = new Schema(
  {
    title: String,
    description: String,
    date: Date,
  },
  { timestamps: true } // Enables createdAt and updatedAt
);
// create model

const Note = mongoose.model("Note", noteSchema);
export default Note;

//   { new: true } update schema
