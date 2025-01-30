import express from "express";
import {
  Register,
  Login,
  ResetPassword,
  ForgotPassword,
  getCurrentUser,
  getUserById,
  getAllUsers,
} from "../Controller/UserController.js";
import protect from "../middlewares/AuthMiddleware.js";

const UserRoutes = express.Router();

// Define user routes
UserRoutes.post("/login", Login);
UserRoutes.post("/register", Register);
UserRoutes.post("/forgotPassword", ForgotPassword);
UserRoutes.post("/resetPassword", ResetPassword);
// UserRoutes.get("/");
UserRoutes.get("/", getAllUsers); // Get all users
UserRoutes.get("/:id", getUserById); // Get single user by ID
UserRoutes.get("/me", protect, getCurrentUser); // Get logged-in user

export default UserRoutes;
