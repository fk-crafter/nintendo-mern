import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import "./models/userModel";
import "./models/productModel";
import "./models/orderModel";

import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydb";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
