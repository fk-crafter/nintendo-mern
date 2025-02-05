const mongoose = require("mongoose");

// définit le schéma pour les produits
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true } // Ajoute des champs "createdAt" et "updatedAt"
);

// créer un modèle pour les produits
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
