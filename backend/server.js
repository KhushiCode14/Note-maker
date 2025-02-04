// import dotenv from "dotenv";

import app from "./src/app.js";
import ConnectDB from "./src/config/Db.js";
import config from "./src/config/config.js";

const PORT = config.port || 4000;
const host = "localhost";

// dotenv.config(); // Load environment variables at the very beginning
const createServer = async () => {
  try {
    await ConnectDB(); // Ensure DB connection before starting the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port  http://${host}:${PORT}`);
    });
  } catch (error) {
    console.error(
      "❌ Failed to connect to the database. Server not started.",
      error
    );
    process.exit(1); // Exit if DB connection fails
  }
};

createServer();
