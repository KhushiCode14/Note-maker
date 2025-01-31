import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";
// Assuming you have a User model
import config from "../config/config.js";

const protect = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.jwt_secret); // Replace with your secret key
    const user = await User.findById(decoded.id); // Find user by ID (ensure it's in the token)

    if (!user) {
      return res.status(401).json({ message: "User not found, unauthorized" });
    }

    req.user = user; // Attach user to the request object for future use
    next(); // Proceed to the next middleware (getCurrentUser)
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token is invalid or expired" });
  }
};
export default protect;
