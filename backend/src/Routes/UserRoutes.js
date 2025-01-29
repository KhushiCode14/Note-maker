import express from "express";

const UserRoutes = express.Router();

// Define user routes
UserRoutes.post("/login");
UserRoutes.post("/register");
UserRoutes.post("/forgotPassword");
UserRoutes.post("/resetPassword");
UserRoutes.get("/");

export default UserRoutes;
