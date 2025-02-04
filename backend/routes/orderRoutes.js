import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// créer une commande
router.post("/", async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;
    const newOrder = new Order({ userId, products, totalAmount });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// récupérer toutes les commandes (admin)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("products.productId", "name price");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

export default router;
