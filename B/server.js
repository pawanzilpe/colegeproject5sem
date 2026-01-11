const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const connectDb = require("./config/db");


// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const collegeRoutes = require("./routes/collegeRoutes");

// Load env variables
dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve images

// Connect Database
connectDb();

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/college", collegeRoutes);

// Default route
app.get("/", (req, res) => res.send("API is running..."));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
connectDb();
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));







