import express from "express";

const NoteRoutes = express.Router();

// Define user routes
// 🟢 CREATE A NEW NOTE
NoteRoutes.post("/");

// 🟠 UPDATE A NOTE
NoteRoutes.put("/:id");
// 🔴 DELETE A NOTE
NoteRoutes.delete("/:id");
// 🔵 GET ALL NOTES FOR LOGGED-IN USER
NoteRoutes.post("/");
// 🟡 GET A SINGLE NOTE BY ID
NoteRoutes.get("/:id");

export default NoteRoutes;
