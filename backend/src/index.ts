import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// route pour ajouter un produit
app.post("/products", async (req: Request, res: Response) => {
  const { name, price, image, description } = req.body;

  try {
    const newProduct = new Product({ name, price, image, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
});

// route pour recup tous les produits
app.get("/products", async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express with MongoDB and TypeScript!");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
