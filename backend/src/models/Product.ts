import mongoose, { Schema, Document } from "mongoose";

// modèle du produit
interface IProduct extends Document {
  name: string;
  price: number;
  image: string;
  description: string;
}

// schéma pour le produit
const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
