const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Créer un produit (create)
router.post("/", async (req, res) => {
  try {
    const { name, price, image, description } = req.body;

    const product = new Product({
      name,
      price,
      image,
      description,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création du produit" });
  }
});

// Obtenir tous les produits (read)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la récupération des produits" });
  }
});

// Obtenir un produit par ID (read)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.json(product);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la récupération du produit" });
  }
});

// Mettre à jour un produit (update)
router.put("/:id", async (req, res) => {
  try {
    const { name, price, image, description } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, image, description },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour du produit" });
  }
});

// Supprimer un produit (delete)
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la suppression du produit" });
  }
});

module.exports = router;
