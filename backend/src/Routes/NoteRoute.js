import express from "express";
import { CreateNote, GetNote } from "../Controller/NoteController.js";
import protect from "../middlewares/AuthMiddleware.js";
const NoteRoutes = express.Router();

// Define user routes
// 🟢 CREATE A NEW NOTE
NoteRoutes.post("/", protect, CreateNote);

// 🟠 UPDATE A NOTE
NoteRoutes.put("/:id");
// 🔴 DELETE A NOTE
NoteRoutes.delete("/:id");
// 🔵 GET ALL NOTES FOR LOGGED-IN USER
NoteRoutes.post("/");
// 🟡 GET A SINGLE NOTE BY ID
NoteRoutes.get("/:id", GetNote);

export default NoteRoutes;
