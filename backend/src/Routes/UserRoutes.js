import express from "express";
import { Register, Login } from "../Controller/UserController.js";

const UserRoutes = express.Router();

// Define user routes
UserRoutes.post("/login", Login);
UserRoutes.post("/register", Register);
UserRoutes.post("/forgotPassword");
UserRoutes.post("/resetPassword");
UserRoutes.get("/");

export default UserRoutes;
