import mongoose from "mongoose";
const { Schema } = mongoose; //destructure schema from mongoose
// console.log(mongoose);

// Define schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  note: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
      default: [],
      validate: {
        validator: (value) => mongoose.Types.ObjectId.isValid(value),
        message: "Invalid ObjectId in 'note' array",
      },
    },
  ],
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// Define model

const User = mongoose.model("User", UserSchema);

export default User;
