const cron = require("node-cron");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// Configuration for Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Replace with your email service provider
  auth: {
    user: "tfrkalwani2104@gmail.com", // Your email address
    pass: "bwrf mzrn mexi rbhi", // Your email password or app password
  },
});

// Function to send email
const sendEmail = (recipientEmail, filePath) => {
  console.log("File Path Inside sendEmail:", filePath); // Debugging: Check filePath

  // Check if file path is valid and the file exists
  if (!filePath || !fs.existsSync(filePath)) {
    console.error("Invalid file path or file does not exist.");
    throw new Error(`Invalid file path or file does not exist: ${filePath}`);
  }

  const mailOptions = {
    from: "tfrkalwani2104@gmail.com", // Sender's email address
    to: recipientEmail, // Recipient email
    subject: `${new Date()} Monthly Report`,
    text: "Please find the monthly report attached.",
    attachments: [
      {
        filename: "ASIYA_SSC.pdf",
        content: fs.createReadStream(filePath), // Correct way to attach PDF
        contentType: "application/pdf", // Set MIME type for PDF
      },
    ],
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

// List of recipients to send emails
const recipientEmails = ["mzaki2599@gmail.com"];

// Path to the file to be attached (change as needed)
let filePath = path.resolve("D:\\ASIYA_SSC.pdf");
console.log("Resolved file path:", filePath); // Debugging: Check file path resolution

// Check if file exists before proceeding
if (!fs.existsSync(filePath)) {
  console.error("File not found at path:", filePath);
  throw new Error(`File not found: ${filePath}`);
}

// Schedule the email to run on the 1st of every month at 9:00 AM
cron.schedule("0 9 1 * *", () => {
  console.log("Sending monthly reports...");
  console.log("File path before sending email:", filePath); // Debugging line

  // Send email to each recipient
  recipientEmails.forEach((email) => {
    sendEmail(email, filePath);
    console.log("Email sent to:", email);
  });
});

module.exports = { sendEmail };
