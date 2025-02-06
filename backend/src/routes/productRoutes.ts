import express, { Request, Response } from "express";
import Product from "../models/productModel";
import { body, validationResult } from "express-validator";

const router = express.Router();

// ➤ Créer un produit (POST /api/products)
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Le nom du produit est requis"),
    body("description").notEmpty().withMessage("La description est requise"),
    body("price").isNumeric().withMessage("Le prix doit être un nombre"),
    body("image").notEmpty().withMessage("L'image est requise"),
    body("stock")
      .isInt({ min: 0 })
      .withMessage("Le stock doit être un nombre positif"),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const { name, description, price, image, stock } = req.body;
      const newProduct = new Product({
        name,
        description,
        price,
        image,
        stock,
      });

      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  }
);

// ➤ Obtenir tous les produits (GET /api/products)
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ➤ Obtenir un produit par ID (GET /api/products/:id)
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Produit non trouvé" });
      return;
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ➤ Mettre à jour un produit (PUT /api/products/:id)
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      res.status(404).json({ message: "Produit non trouvé" });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ➤ Supprimer un produit (DELETE /api/products/:id)
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Produit non trouvé" });
      return;
    }

    res.json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
