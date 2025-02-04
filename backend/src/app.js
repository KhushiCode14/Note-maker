import express from "express";
import cors from "cors";
import UserRoutes from "./Routes/UserRoutes.js";
import NoteRoutes from "./Routes/NoteRoute.js";
import config from "./config/config.js";
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: config.frontend_url, // Fixed incorrect URL
    credentials: true, // Allows cookies & authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);
console.log(config.frontend_url);
app.use("/api/user", UserRoutes);
app.use("/api/note", NoteRoutes);
export default app;
