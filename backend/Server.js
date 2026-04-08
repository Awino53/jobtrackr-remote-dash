import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Test route (VERY important)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.log("DB Error:", err));

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});