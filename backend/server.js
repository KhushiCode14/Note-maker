import app from "./src/app.js";

const PORT = process.env.PORT || 3000;

const createServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

createServer();
