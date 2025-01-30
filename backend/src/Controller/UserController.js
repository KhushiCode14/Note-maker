import bcrypt from "bcryptjs";
import User from "../Models/UserModel.js";
import generateToken from "../utils/GenerateToken.js";
import generateResetToken from "../utils/GenerateResetToken.js";
import sendEmail from "../utils/SendEmails.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const Register = async (req, res) => {
  // Get user input (name, email, password)
  const { username, email, password } = req.body;

  // Validate input (all fields required)
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user exists in the database
    const existUser = await User.findOne({ email }); // Use findOne() to get a single user
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // Use await for async hashing

    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await user.save();

    // Generate JWT token after user is created
    const token = generateToken(user._id);

    // Return success response with user details (excluding password)
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const Login = async (req, res) => {
  // Get user input (email, password)
  const { email, password } = req.body;

  // Validate input (all fields required)
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if the 'note' field contains valid ObjectIds
    if (
      user.note &&
      user.note.some((noteId) => !mongoose.Types.ObjectId.isValid(noteId))
    ) {
      return res
        .status(400)
        .json({ message: "Invalid note ID in user record" });
    }
    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Update last login time
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token after user is authenticated
    const token = generateToken(user._id);

    // Return success response with user details (excluding password)
    res.json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        note: user.note,
        token,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// TODO: Implement password reset functionality
// @ reset password
// @reset password
const ResetPassword = async (req, res) => {
  // 1. Get user input (token, newPassword, username)
  const { token, newPassword, username } = req.body;

  if (!token || !newPassword || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.RESET_TOKEN_SECRET); // Ensure the token is valid

    // 3. Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 4. Check if token matches the one stored in the user record and verify expiry
    if (
      user.resetPasswordToken !== token ||
      Date.now() > user.resetPasswordExpires
    ) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // 5. Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 6. Update the user's password and clear reset fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    // 7. Send success response
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error during password reset:", error);
    res
      .status(500)
      .json({ message: "Failed to reset password. Please try again later." });
  }
};
// @ forgot password
//   /api/user/forgotPassword
// @forgot password
const ForgotPassword = async (req, res) => {
  const { email } = req.body;

  // 1. Check if the email is provided
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // 2. Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // 3. Generate reset token and expiration time
  const resetToken = generateResetToken(user._id);
  const resetTokenExpiration = Date.now() + 10 * 60 * 1000; // 10 minutes

  // 4. Update the user's reset token and expiration time
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = resetTokenExpiration;
  await user.save();

  // 5. Create reset link (the URL for your frontend reset password page)
  const resetLink = `http://yourfrontend.com/reset-password?token=${resetToken}`; // Adjust the URL to your reset route

  // 6. Prepare email content
  const htmlContent = `
    <p>Hi ${user.username},</p>
    <p>You requested a password reset. Click the link below to reset your password:</p>
    <a href="${resetLink}">Reset Password</a>
    <p>This link will expire in 10 minutes.</p>
  `;
  console.log(resetToken);
  // 7. Send the email using sendEmail function
  try {
    await sendEmail(user.email, "Password Reset Request", htmlContent);
    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Failed to send email. Please try again later." });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password") // Exclude passwords
      .populate("note");
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};
const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not found, unauthorized" });
    }

    res.status(200).json(req.user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching current user", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

      .select("-password") // Exclude passwords
      .populate("note"); // Exclude passwords;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

//^ 📌 Steps to Register a User
// Get user input (username, email, password)
// Validate input (all fields required, email must be unique)
// Check if user exists in the database
// Hash the password before saving
// Save user in DB
// Generate JWT token for authentication
// Return user details (except password) with token

//^ 📌 Steps to Login a User
// Get user input (, email, password)
// Validate input (all fields required, email must be unique)
// Check if user exists in the database
// Check if password matches
// Update last login time
// Generate JWT token after user is authenticated
// Return success response with user details (excluding password)
export {
  Register,
  Login,
  ResetPassword,
  ForgotPassword,
  getCurrentUser,
  getUserById,
  getAllUsers,
};
