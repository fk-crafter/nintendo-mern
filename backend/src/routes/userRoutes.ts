import express, { Request, Response, Router } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router: Router = express.Router();

// l'inscription d'un utilisateur
router.post("/register", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Cet utilisateur existe déjà." });
      return;
    }

    // hashe le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // crée un nouvel utilisateur
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Utilisateur créé avec succès !" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// connexion d'un utilisateur
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // vérifie si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé." });
      return;
    }

    // vérifie le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Mot de passe incorrect." });
      return;
    }

    // génère un token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// récupère tous les utilisateurs (ADMIN uniquement)
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select("-password"); // ne pas renvoyer les mots de passe
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

export default router;
