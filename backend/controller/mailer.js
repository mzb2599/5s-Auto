const cron = require("node-cron");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const { format, sub } = require("date-fns");

// Configuration for Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Replace with your email service provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
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
        filename: fileName,
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

const fileName = `Monthly_Orders_Report_${format(
  sub(new Date(), { months: 1 }),
  "MMM-yy"
)}.pdf`;

// Path to the file to be attached (change as needed)
let filePath = path.join(__dirname, "..", "monthly-report/", fileName);
console.log("Resolved file path:", filePath); // Debugging: Check file path resolution

// Check if file exists before proceeding
// if (!fs.existsSync(filePath)) {
//   console.error("File not found at path:", filePath);
//   throw new Error(`File not found: ${filePath}`);
// }

// Function to send POST request
const sendPostRequest = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/orders/report/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("POST request successful:", data);
  } catch (error) {
    console.error("Error sending POST request:", error);
  }
};

// Schedule the function to run on the last day of every month at 11:59 PM
cron.schedule("0 8 1 * *", () => {
  const today = new Date();
  const lastDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();

  if (true) {
    console.log("Running scheduled task on the last day of the month...");
    sendPostRequest();
  }
});

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
