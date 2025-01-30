import mongoose from "mongoose";
const { Schema } = mongoose;

// Define schema
const noteSchema = new Schema(
  {
    title: String,
    description: String,
    priority: Number,
    status: { type: String, enum: ["active", "inactive"] },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
    }, // Foreign key for user model
    // .populate("userId"); this is way to use
  },
  { timestamps: true } // Enables createdAt and updatedAt
);
// create model

const Note = mongoose.model("Note", noteSchema);
export default Note;

//   { new: true } update schema
