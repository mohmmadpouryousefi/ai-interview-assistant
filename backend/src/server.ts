import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from "../src/routes/auth.routes";
import aiRoutes from "../src/routes/ai.routes";

// Initialize Express
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("AI Interview Assistant API is running");
});

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    const mongoUri =
      process.env.MONGODB_URI ||
      "mongodb://localhost:27017/ai_interview_assistant";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

startServer();
