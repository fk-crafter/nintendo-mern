import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Rendre le mot de passe optionnel
  role: "user" | "admin";
}

// schema
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, // On autorise les comptes Google sans mot de passe
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

// modèle
export const User = mongoose.model<IUser>("User", UserSchema);
