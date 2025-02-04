import express, { Request, Response, Router } from "express";
import { Product } from "../models/Product";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router: Router = express.Router();

// recupere tous les produits (accessible à tous)
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// ajouter un produit (ADMIN uniquement)
router.post(
  "/",
  protect,
  adminOnly,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description, price, image, stock } = req.body;

      if (!name || !description || !price || !image || !stock) {
        res.status(400).json({ message: "Tous les champs sont requis" });
        return;
      }

      const newProduct = new Product({
        name,
        description,
        price,
        image,
        stock,
      });
      await newProduct.save();
      res
        .status(201)
        .json({ message: "Produit ajouté avec succès", product: newProduct });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  }
);

// modifier un produit (ADMIN uniquement)
router.put(
  "/:id",
  protect,
  adminOnly,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description, price, image, stock } = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { name, description, price, image, stock },
        { new: true }
      );

      if (!updatedProduct) {
        res.status(404).json({ message: "Produit non trouvé" });
        return;
      }

      res.json({ message: "Produit mis à jour", product: updatedProduct });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  }
);

// supprimer un produit (ADMIN uniquement)
router.delete(
  "/:id",
  protect,
  adminOnly,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        res.status(404).json({ message: "Produit non trouvé" });
        return;
      }

      res.json({ message: "Produit supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  }
);

export default router;
