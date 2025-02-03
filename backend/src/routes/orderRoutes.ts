import express, { Request, Response, Router } from "express";
import { Order } from "../models/Order";

const router: Router = express.Router();

// récupère toutes les commandes (ADMIN uniquement)
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// récupérer une commande par ID
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate("products.product");

    if (!order) {
      res.status(404).json({ message: "Commande non trouvée" });
      return;
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// créer une nouvelle commande
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, products, totalPrice } = req.body;

    if (!user || !products || products.length === 0 || !totalPrice) {
      res
        .status(400)
        .json({ message: "Toutes les informations sont requises" });
      return;
    }

    const newOrder = new Order({ user, products, totalPrice });
    await newOrder.save();
    res
      .status(201)
      .json({ message: "Commande créée avec succès", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// mettre à jour une commande (ex: changer le statut)
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      res.status(404).json({ message: "Commande non trouvée" });
      return;
    }

    res.json({ message: "Commande mise à jour", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// supprimer une commande
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      res.status(404).json({ message: "Commande non trouvée" });
      return;
    }

    res.json({ message: "Commande supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

export default router;
