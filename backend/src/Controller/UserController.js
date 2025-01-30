import bcrypt from "bcryptjs";
import User from "../Models/UserModel.js";
import generateToken from "../utils/GenerateToken.js";

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

export { Register };
