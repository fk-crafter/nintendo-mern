const express = require("express");
const Order = require("../models/Order");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// @route   POST /api/orders
// @desc    Créer une nouvelle commande
// @access  Privé (utilisateur connecté)
router.post("/", protect, async (req, res) => {
  try {
    const { products, totalPrice } = req.body;

    if (!products || products.length === 0) {
      return res
        .status(400)
        .json({ message: "La commande ne peut pas être vide" });
    }

    const newOrder = new Order({
      user: req.user._id,
      products,
      totalPrice,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
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

// @route   GET /api/orders
// @desc    Récupérer toutes les commandes (Admin uniquement)
// @access  Privé (Admin)
router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price");
    res.json(orders);
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
