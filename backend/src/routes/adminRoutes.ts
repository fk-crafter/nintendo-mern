import express from "express";
import { User } from "../models/User";
import { Product } from "../models/Product";
import { Order } from "../models/Order"; // Si tu as un modèle de commandes
import { protect, adminOnly } from "../middleware/authMiddleware"; // Utiliser adminOnly au lieu de isAdmin

const router = express.Router();

// Route pour récupérer les statistiques de la dashboard
router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalRevenue = Math.floor(Math.random() * 100000) + 1000; // Chiffre fictif

    // Simulation des ventes du mois pour le graphique
    const salesData = Array.from({ length: 12 }, () =>
      Math.floor(Math.random() * 1000)
    );

    res.json({
      totalUsers,
      totalProducts,
      totalRevenue,
      salesData,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

export default router;
