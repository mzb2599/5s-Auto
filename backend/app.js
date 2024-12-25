const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("./controller/mailer");
const morgan = require("morgan");

// Middleware
app.use(bodyParser.json());
app.use(cors());
// MongoDB connection string
const mongoURI =
  "mongodb+srv://mzakib:mzaki2599@5s-cluster.0cad97c.mongodb.net/";

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Import routes
const orderRoutes = require("./routes/orders");
const customerRoutes = require("./routes/customers");
const emailRoutes = require("./routes/mail");

// Use routes
app.use("/api/orders", orderRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/email", emailRoutes);
app.use(morgan("tiny"));

//Email scheduler
//sendEmail(,'D:\\ASIYA_SSC.pdf');

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
