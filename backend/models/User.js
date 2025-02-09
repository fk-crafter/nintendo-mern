const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Définition du schéma utilisateur
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Obligatoire
    },
    email: {
      type: String,
      required: true,
      unique: true, // Un email ne peut pas être en double
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // L'utilisateur peut être "user" ou "admin"
      default: "user", // Par défaut, c'est un utilisateur normal
    },
  },
  {
    timestamps: true, // Ajoute automatiquement les champs "createdAt" et "updatedAt"
  }
);

// Middleware avant de sauvegarder un utilisateur : hachage du mot de passe
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
