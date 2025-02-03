import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app: Application = express();

// middlewares
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // branche nextjs sur le serv
app.use(cookieParser());

// connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("🟢 Connecté à MongoDB"))
  .catch((err: unknown) => console.error("🔴 Erreur MongoDB :", err));

// route test
app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur l'API du Shop Nintendo !");
});

// lance le serveur
const PORT = process.env.PORT || 5001;
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () =>
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`)
);
