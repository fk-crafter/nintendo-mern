import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("⚠️ MONGO_URI n'est pas définie dans .env");
}

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  await mongoose.connect(MONGO_URI);
  console.log("✅ Connecté à MongoDB !");
};
