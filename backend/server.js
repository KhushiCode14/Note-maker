import app from "./src/app.js";
import ConnectDB from "./src/config/Db.js";

const PORT = process.env.PORT || 3000;

const createServer = () => {
  ConnectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

createServer();
