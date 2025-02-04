import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config(); // Charge les variables du fichier .env

const app = express();

app.use(express.json());

const createAdminUser = async () => {
  const user = new User({
    name: "eurekabox",
    email: "khhfofo93@@gmail.com",
    password: "paSsWoRd123",
    isAdmin: true,
  });

  await user.save();
  console.log("Utilisateur admin créé !");
};

// createAdminUser();

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connecté !"))
  .catch((err) => console.log("❌ Erreur de connexion MongoDB :", err));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Serveur Express fonctionne !");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
});
