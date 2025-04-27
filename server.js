const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");
dotenv.config();
connectDB(); // << --- Call DB connect

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // only allow this frontend
  credentials: true
}));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
