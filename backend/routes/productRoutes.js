const express = require("express");
const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// @route   GET /api/products
// @desc    Récupérer tous les produits
// @access  Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// @route   GET /api/products/:id
// @desc    Récupérer un produit par son ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.json(product);
  } catch (error) {
    console.error("Erreur serveur :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// @route   POST /api/products
// @desc    Ajouter un produit (Admin uniquement)
// @access  Privé (Admin)
router.post("/", protect, admin, async (req, res) => {
  try {
    const { name, description, price, stock, category, image } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      image,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// @route   PUT /api/products/:id
// @desc    Modifier un produit (Admin uniquement)
// @access  Privé (Admin)
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const { name, description, price, stock, category, image } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.category = category || product.category;
    product.image = image || product.image;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// @route   DELETE /api/products/:id
// @desc    Supprimer un produit (Admin uniquement)
// @access  Privé (Admin)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    await product.deleteOne();
    res.json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// @route   GET /api/orders/my
// @desc    Récupérer les commandes de l'utilisateur connecté
// @access  Privé (utilisateur connecté)
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "products.product",
      "name price"
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
