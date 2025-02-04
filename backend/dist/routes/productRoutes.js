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
const Product_1 = require("../models/Product");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// 📌 Récupérer tous les produits (accessible à tous)
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.Product.find();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}));
// 📌 Ajouter un produit (ADMIN uniquement)
router.post("/", authMiddleware_1.protect, authMiddleware_1.adminOnly, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, image, stock } = req.body;
        if (!name || !description || !price || !image || !stock) {
            res.status(400).json({ message: "Tous les champs sont requis" });
            return;
        }
        const newProduct = new Product_1.Product({
            name,
            description,
            price,
            image,
            stock,
        });
        yield newProduct.save();
        res
            .status(201)
            .json({ message: "Produit ajouté avec succès", product: newProduct });
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}));
// 📌 Modifier un produit (ADMIN uniquement)
router.put("/:id", authMiddleware_1.protect, authMiddleware_1.adminOnly, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, image, stock } = req.body;
        const updatedProduct = yield Product_1.Product.findByIdAndUpdate(req.params.id, { name, description, price, image, stock }, { new: true });
        if (!updatedProduct) {
            res.status(404).json({ message: "Produit non trouvé" });
            return;
        }
        res.json({ message: "Produit mis à jour", product: updatedProduct });
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}));
// 📌 Supprimer un produit (ADMIN uniquement)
router.delete("/:id", authMiddleware_1.protect, authMiddleware_1.adminOnly, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield Product_1.Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            res.status(404).json({ message: "Produit non trouvé" });
            return;
        }
        res.json({ message: "Produit supprimé avec succès" });
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}));
exports.default = router;
