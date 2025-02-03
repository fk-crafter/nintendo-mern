import express, { Request, Response, Router } from "express";
import { Product } from "../models/Product";

const router: Router = express.Router();

// récupère tous les produits
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

export default router;
