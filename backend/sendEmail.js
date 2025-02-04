require('dotenv').config(); // Load environment variables from .env file
const nodemailer = require('nodemailer');

async function sendForgotPasswordEmail(userEmail, resetLink) {
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use another SMTP service
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or an app-specific password
    },
  });

  // Define email content
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: userEmail, // Recipient address
    subject: 'Forgot Password Request', // Email subject
    html: `
      <p>We received a request to reset the password for your account.</p>
      <p>If you did not make this request, please ignore this email.</p>
      <p>To reset your password, click the link below:</p>
      <a href="${resetLink}">Reset Password</a>
    `, // HTML content of the email
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
}

module.exports = sendForgotPasswordEmail;
