import mongoose from "mongoose";
import config from "./config.js";
// console.log(config);
const ConnectDB = async () => {
  try {
    await mongoose.connect(config.mongo_url);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

// Event Listeners for Mongoose Connection
mongoose.connection.on("connected", () => {
  console.log("✅ Mongoose connected to the database.");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ Mongoose disconnected.");
});

// Graceful shutdown on app termination
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("⚠️ Mongoose connection closed due to app termination.");
  process.exit(0);
});

export default ConnectDB;
