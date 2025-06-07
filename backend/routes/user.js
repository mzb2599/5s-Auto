const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();
const sendForgotPasswordEmail = require("../sendEmail");
const bcrypt = require("bcrypt");

// Secret for JWT - should be stored in .env for production
const JWT_SECRET = process.env.JWT_TOKEN;

// Get all Users (GET)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve users", error: error.message });
  }
});

// Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordValid ) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Failed to login",
      error: error.message,
    });
  }
});

// Forgot Password Route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    // Don't reveal whether a user exists for security
    if (!user) {
      return res.status(200).json({
        message:
          "If an account exists, a password reset link will be sent to your email",
      });
    }

    // Generate a password reset token
    const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Create reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}?mail=${email}`;

    // Send email
    await sendForgotPasswordEmail(email, resetLink);

    res.status(200).json({
      message:
        "If an account exists, a password reset link will be sent to your email",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      message: "Failed to process password reset request",
      error: error.message,
    });
  }
});

// router.patch("/update-password", (req, res) => {
//   const { password } = req.body;
//   const userEmail = req.body.email;

//   if (!password) {
//     return res.status(400).json({ message: "Password is required" });
//   }

//   // Update the password in the database (replace this with actual DB logic)
//   User.findOneAndUpdate({ password: password }, { where: { email: userEmail } })
//     .then(() =>
//       res.status(200).json({ message: "Password updated successfully" })
//     )
//     .catch((error) =>
//       res.status(500).json({ message: "Error updating password", error })
//     );
// });

router.patch("/update-password", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  
  if (!password) {
    return res.status(400).json({ message: "New password is required" });
  }

  try {
    // Find the user by the email decoded from the token
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's password in the database
    user.password = password;
    await user.save();
    console.log(user);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Invalid or expired token", error: error.message });
  }
});

module.exports = router;
