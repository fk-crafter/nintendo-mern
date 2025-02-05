const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Inscription d'un nouvel utilisateur (create)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Utilisateur déjà existant" });
    }

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur" });
  }
});

// Authentification de l'utilisateur
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Authentification réussie", token });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'authentification" });
  }
});

// Obtenir un utilisateur par ID (pour un admin)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la récupération de l'utilisateur" });
  }
});

module.exports = router;
