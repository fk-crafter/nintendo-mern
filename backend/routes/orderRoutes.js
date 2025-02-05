const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// Créer une commande
router.post("/", async (req, res) => {
  try {
    const { user, products, total } = req.body;

    const order = new Order({
      user,
      products,
      total,
      status: "pending",
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création de la commande" });
  }
});

// Récupérer toutes les commandes
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product");
    res.json(orders);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la récupération des commandes" });
  }
});

// Récupérer une commande par ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate("products.product");
    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }
    res.json(order);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la récupération de la commande" });
  }
});

// Mettre à jour le statut d'une commande
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.json(updatedOrder);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour de la commande" });
  }
});

module.exports = router;
