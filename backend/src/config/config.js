import dotenv from "dotenv";
dotenv.config();

// Configuration function
const _config = () => ({
  // env: process.env.NODE_ENV || "development",
  port: process.env.PORT,
  mongo_url: process.env.MONGODB_URI,
  reset_secret: process.env.RESET_TOKEN_SECRET,
  jwt_secret: process.env.JWT_SECRET,
  email_username: process.env.EMAIL_USER,
  email_password: process.env.EMAIL_PASSWORD,
  frontend_url: process.env.FRONTEND_URL,
  // Uncomment if needed
  // AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID, // Uncomment if needed
  // AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY, // Uncomment if needed
});

// Call the function to get the configuration object
const config = _config();

// Freeze the configuration object to prevent modifications
Object.freeze(config);

// Log the configuration object
// console.log(config);

// Export the configuration as 'config'
export default config;
