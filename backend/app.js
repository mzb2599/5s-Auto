const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("./controller/mailer");
require("dotenv").config();
const morgan = require("morgan");
const path = require("path");

// Middlewares
app.use(bodyParser.json());
const allowedOrigins = [process.env.FRONTEND_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);
app.use(morgan("tiny"));

// MongoDB connection string
const mongoURI = process.env.MONGODB_URI;

try {
  // Connect to MongoDB
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.log("MongoDB connection error:", err));
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}
// Import routes
const orderRoutes = require("./routes/orders");
const customerRoutes = require("./routes/customers");
const emailRoutes = require("./routes/mail");
const userRoutes = require("./routes/user");
// Use routes
app.use("/api/orders", orderRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/email", emailRoutes);
app.use("/api", userRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Always serve index.html for unmatched routes (after all API routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
