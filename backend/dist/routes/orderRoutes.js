"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Order_1 = require("../models/Order");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// 📌 Récupérer toutes les commandes (ADMIN uniquement)
router.get("/", authMiddleware_1.protect, authMiddleware_1.adminOnly, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.Order.find()
            .populate("user")
            .populate("products.product");
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}));
// 📌 Récupérer une commande par ID
router.get("/:id", authMiddleware_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order_1.Order.findById(req.params.id)
            .populate("user")
            .populate("products.product");
        if (!order) {
            res.status(404).json({ message: "Commande non trouvée" });
            return;
        }
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}));
// 📌 Créer une nouvelle commande (Utilisateur connecté uniquement)
router.post("/", authMiddleware_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products, totalPrice } = req.body;
        if (!products || products.length === 0 || !totalPrice) {
            res
                .status(400)
                .json({ message: "Toutes les informations sont requises" });
            return;
        }
        // ✅ Correction : TypeScript comprend maintenant `req.user`
        if (!req.user) {
            res.status(401).json({ message: "Utilisateur non authentifié" });
            return;
        }
        const newOrder = new Order_1.Order({ user: req.user.id, products, totalPrice });
        yield newOrder.save();
        res
            .status(201)
            .json({ message: "Commande créée avec succès", order: newOrder });
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}));
// 📌 Mettre à jour une commande (ex: changer le statut)
router.put("/:id", authMiddleware_1.protect, authMiddleware_1.adminOnly, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const updatedOrder = yield Order_1.Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updatedOrder) {
            res.status(404).json({ message: "Commande non trouvée" });
            return;
        }
        res.json({ message: "Commande mise à jour", order: updatedOrder });
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}));
// 📌 Supprimer une commande
router.delete("/:id", authMiddleware_1.protect, authMiddleware_1.adminOnly, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedOrder = yield Order_1.Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            res.status(404).json({ message: "Commande non trouvée" });
            return;
        }
        res.json({ message: "Commande supprimée avec succès" });
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}));
exports.default = router;
