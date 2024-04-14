import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import AdminRoutes from "./routes/AdminRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());
const MONGODB_URI = process.env.MONGODB_URI || "undefined";
// Routes
app.use("/api/admin", AdminRoutes);
// Middleware to handle routing errors
app.use((req, res, next) => {
    const error = new Error("Not Found");
    res.status(404);
    next(error);
});
// Error-first middleware for other errors
app.use((error, req, res, next) => {
    res.status(res.statusCode || 500);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
    });
});
const PORT = process.env.ADMIN_PORT || 3001;
mongoose
    .connect(MONGODB_URI)
    .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
});
