import express from "express";
import {
  CreateNote,
  DeleteNote,
  GetNote,
  UpdateNote,
  SearchNote,
  GetAllNotes,
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

// 🔵  Search for a note via title description, date
NoteRoutes.get("/search", protect, SearchNote);

// 🟡 GET A SINGLE NOTE BY ID
NoteRoutes.get("/:id", protect, GetNote);
// 🟡 GET A ALL NOTE BY USER
NoteRoutes.get("/", protect, GetAllNotes);

export default NoteRoutes;
