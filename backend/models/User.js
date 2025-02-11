const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Définition du schéma utilisateur
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // nom obligatoire
    },
    email: {
      type: String,
      required: true,
      unique: true, // verifie si l'email est unique
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // verifie si l'utilisateur est admin ou user
      default: "user", // par defaut c'est un utilisateur normal
    },
  },
  {
    timestamps: true, // ajoute automatiquement les champs "createdAt" et "updatedAt"
  }
);

// middleware avant de sauvegarder un utilisateur : hachage du mot de passe
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
