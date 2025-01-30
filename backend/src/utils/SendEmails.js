// utils/sendEmail.js
import nodemailer from "nodemailer";
import config from "../config/config.js";
// nodemailer -->send emails (JS library)
// Set up Nodemailer transport
const transporter = nodemailer.createTransport({
  service: "gmail", // Can be replaced with another service like 'SendGrid'
  secure: true,
  host: 456,
  auth: {
    user: config.email_username, // Your email address
    pass: config.email_password, // Your email password (or app-specific password)
  },
});
// console.log(transporter/);

// Function to send email
const sendEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: config.email_username, // sender address
    to, // receiver address
    subject, // Subject line
    html: htmlContent, // HTML content of the email
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);

    throw new Error("Failed to send email. Please try again later.");
  }
};

export default sendEmail;

// ��� How to Set up Gmail as a Nodemailer Transport
// 📌 Steps for Sending Emails with Nodemailer
// Set up Nodemailer:

// Install Nodemailer using npm or yarn.
// Create a transport (email service configuration) to send emails via an SMTP server.
// Create Mail Options:

// Set the sender's email, recipient email, subject, and body (HTML or text).
// Send Email:

// Use the sendMail method of the transporter to send the email.
// Error Handling:

// Handle any errors that may occur during the email sending process.
// Return Response:

// Return a success message if the email was sent successfully, or an error message if it failed.
