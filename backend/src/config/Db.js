import mongoose from "mongoose";
import config from "./config.js";
console.log(config.mongo_url);
// Set up default mongoose connection
const ConnectDB = async () => {
  try {
    await mongoose.connect(config.mongo_url);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // Exit process on failure
  }
};

export default ConnectDB;
