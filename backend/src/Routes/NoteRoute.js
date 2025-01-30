import express from "express";
import {
  CreateNote,
  DeleteNote,
  GetNote,
  UpdateNote,
} from "../Controller/NoteController.js";
import protect from "../middlewares/AuthMiddleware.js";
const NoteRoutes = express.Router();

// Define user routes
// 🟢 CREATE A NEW NOTE
NoteRoutes.post("/", protect, CreateNote);

// 🟠 UPDATE A NOTE
NoteRoutes.put("/:id", protect, UpdateNote);
// 🔴 DELETE A NOTE
NoteRoutes.delete("/:id", protect, DeleteNote);
// // 🔵 GET ALL NOTES FOR LOGGED-IN USER
// NoteRoutes.post("/");
// 🟡 GET A SINGLE NOTE BY ID
NoteRoutes.get("/:id", protect, GetNote);

export default NoteRoutes;
