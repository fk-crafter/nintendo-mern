import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";

import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import authRoutes from "./routes/authRoutes";
import statsRoutes from "./routes/statsRoutes";
import uploadRoutes from "./routes/uploadRoutes";

import path from "path";

dotenv.config();
connectDB();

const app = express();

// ✅ CORRECTION : Autoriser Vercel (frontend) et Render (backend)
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Dev local
      process.env.FRONTEND_URL || "https://nintendo-mern.vercel.app/", // Prod sur Vercel
    ],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());

// ✅ Déclaration des routes API
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/upload", uploadRoutes);

// ✅ Correction du dossier statique pour les images
const UPLOADS_DIR = path.join(__dirname, "uploads");
app.use("/uploads", express.static(UPLOADS_DIR));

const PORT: number = Number(process.env.PORT) || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(
    `🌍 Backend disponible sur ${
      process.env.BACKEND_URL || "http://localhost:" + PORT
    }`
  );
});
