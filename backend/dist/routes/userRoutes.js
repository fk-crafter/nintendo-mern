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
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
// 📌 Inscription d'un utilisateur
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Vérifier si l'utilisateur existe déjà
        const existingUser = yield User_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "Cet utilisateur existe déjà." });
            return;
        }
        // Hasher le mot de passe
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Créer un nouvel utilisateur
        const newUser = new User_1.User({ name, email, password: hashedPassword });
        yield newUser.save();
        res.status(201).json({ message: "Utilisateur créé avec succès !" });
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}));
// 📌 Connexion d'un utilisateur
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Vérifier si l'utilisateur existe
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "Utilisateur non trouvé." });
            return;
        }
        // Vérifier le mot de passe
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Mot de passe incorrect." });
            return;
        }
        // Générer un token JWT
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}));
// 📌 Récupérer tous les utilisateurs (ADMIN uniquement)
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find().select("-password"); // Ne pas renvoyer les mots de passe
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}));
exports.default = router;
