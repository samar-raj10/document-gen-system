import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import process from "process";
import CertificateRequestRoutes from "./Routes/CertificateRequestRoutes.js";
import AdminRouter from "./Routes/AdminRouter.js";
import AuthRoutes from "./Routes/AuthRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import "./config/db.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express(); //created an express app

const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());

// Routes
app.use("/api/student", CertificateRequestRoutes);
app.use("/api/admin", AdminRouter);
app.use("/api/auth", AuthRoutes);
app.use("/api/users", userRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    success: false,
  });
});

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
    console.log(`✓ Login endpoint: POST http://localhost:${PORT}/api/student`);
  });
});
