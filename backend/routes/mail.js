const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email provider
  auth: {
    user: "tfrkalwani2104@gmail.com", // Your email address
    pass: "",// removed my password 
  },
});

/**
 * POST /api/send-report
 * Handles sending emails with file attachments
 */
router.post("/send-report", upload.single("file"), async (req, res) => {
  try {
    const { fileType, recipientEmail } = req.body;
    const { file } = req;

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    // Validate recipient email
    if (!recipientEmail) {
      return res.status(400).send("Recipient email is required.");
    }

    // Prepare email options
    const mailOptions = {
      from: "your-email@gmail.com", // Replace with your email
      to: recipientEmail, // Use provided recipient email
      subject: `${fileType} Report`,
      text: `Please find the attached ${fileType} report.`,
      attachments: [
        {
          filename: file.originalname || `report.${fileType.toLowerCase()}`,
          path: file.path,
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Clean up uploaded file
    fs.unlink(file.path, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send the email." });
  }
});

module.exports = router;
