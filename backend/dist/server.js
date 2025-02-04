"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({ credentials: true, origin: "http://localhost:3000" })); // branche nextjs sur le serv
app.use((0, cookie_parser_1.default)());
// connexion à MongoDB
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("🟢 Connecté à MongoDB"))
    .catch((err) => console.error("🔴 Erreur MongoDB :", err));
// route test
app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API du Shop Nintendo !");
});
// lance le serveur
const PORT = process.env.PORT || 5001;
app.use("/api/products", productRoutes_1.default);
app.use("/api/orders", orderRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
