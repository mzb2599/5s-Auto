const cron = require("node-cron");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const { format, sub } = require("date-fns");

// Function to send email
const sendEmail = (recipientEmail, filePath) => {
  console.log("File Path Inside sendEmail:", filePath); // Debugging: Check filePath

  // Configuration for Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail", // Replace with your email service provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  // Check if file path is valid and the file exists
  if (!filePath || !fs.existsSync(filePath)) {
    console.error("Invalid file path or file does not exist.");
    throw new Error(`Invalid file path or file does not exist: ${filePath}`);
  }

  console.log("Email User:", process.env.EMAIL_USER);
  console.log("Email Pass:", process.env.EMAIL_PASS);

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email address
    to: recipientEmail, // Recipient email
    subject: `${format(sub(new Date(),{months:1}), 'MMM-yyyy')} Monthly Report`,
    text: "Please find the monthly report attached.",
    attachments: [
      {
        filename: fileName,
        content: fs.createReadStream(filePath), // Correct way to attach PDF
        contentType: "application/pdf", // Set MIME type for PDF
      },
    ],
  };

  console.log("Before sending email:");
  
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

// Function to send POST request
const sendPostRequest = async () => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/orders/report/create`,
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
// cron.schedule("* * * * *", () => {
// });

// Schedule the email to run on the 1st of every month at 9:00 AM
cron.schedule("0 9 1 * *", async () => {
  await sendPostRequest();
  console.log("Sending monthly reports...");
  console.log("File path before sending email:", filePath); // Debugging line

  // Send email to each recipient
  recipientEmails.forEach((email) => {
    sendEmail(email, filePath);
    console.log("Email sent to:", email);
  });
});

module.exports = { sendEmail };
