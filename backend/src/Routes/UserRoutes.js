import express from "express";
import {
  Register,
  Login,
  ResetPassword,
  ForgotPassword,
} from "../Controller/UserController.js";

const UserRoutes = express.Router();

// Define user routes
UserRoutes.post("/login", Login);
UserRoutes.post("/register", Register);
UserRoutes.post("/forgotPassword", ForgotPassword);
UserRoutes.post("/resetPassword", ResetPassword);
UserRoutes.get("/");

export default UserRoutes;
