// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import adminRoutes from "./modules/stats/adminStat";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", adminRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
