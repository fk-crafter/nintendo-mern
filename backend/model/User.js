const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// définit le schéma pour les utilisateurs
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }, // Rôle de l'utilisateur
  },
  { timestamps: true }
);

// hook pour hasher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// méthode pour vérifier le mot de passe
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// créer un modèle pour les utilisateurs
const User = mongoose.model("User", userSchema);

module.exports = User;
