import jwt from "jsonwebtoken";
import config from "../config/config.js"; // Ensure config has the necessary values

const generateResetToken = (id) => {
  if (!config.reset_secret) {
    throw new Error("Missing reset secret key in config");
  }

  return jwt.sign({ id }, config.reset_secret, { expiresIn: "10m" });
};

export default generateResetToken;
