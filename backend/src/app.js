import express from "express";
import cors from "cors";
import UserRoutes from "./Routes/UserRoutes.js";
import NoteRoutes from "./Routes/NoteRoute.js";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/user", UserRoutes);
app.use("/api/note", NoteRoutes);
export default app;
