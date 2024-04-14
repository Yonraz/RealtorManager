import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import AccessRouter from "./routes/AccessRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "";

// Middleware to handle CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json());
app.use("/api/admin", AccessRouter);

// Middleware to handle routing errors
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found");
  res.status(404).json({ message: error.message });
});

// Connect to MongoDB using Mongoose
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });
