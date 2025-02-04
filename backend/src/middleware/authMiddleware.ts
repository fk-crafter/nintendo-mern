import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Étendre l'interface Request pour inclure user
interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

// Middleware pour l'authentification
export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log("🔍 Token reçu dans le backend :", token); // 🔥 Debug token

    if (!token) {
      console.log("⛔ Aucun token reçu !");
      res.status(401).json({ message: "Accès refusé, token manquant" });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
        role: string;
      };
      console.log("✅ Token décodé avec succès :", decoded); // 🔥 Debug decoded token

      req.user = decoded;
      next();
    } catch (jwtError) {
      console.error("❌ Erreur lors du décodage du token :", jwtError);
      res.status(401).json({ message: "Token invalide" });
    }
  } catch (error) {
    console.error("❌ Erreur dans le middleware protect :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Middleware pour vérifier si un utilisateur est admin
export const adminOnly = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    console.log("⛔ Aucun utilisateur trouvé dans req.user !");
    res
      .status(401)
      .json({ message: "Accès refusé, utilisateur non authentifié" });
    return;
  }

  console.log("🛠️ Debug ROLE de l'utilisateur :", req.user.role); // 🔥 Ajout du log pour voir le rôle

  if (req.user.role !== "admin") {
    console.log("⛔ Utilisateur non admin :", req.user);
    res.status(403).json({ message: "Accès refusé, vous devez être admin" });
    return;
  }

  console.log("✅ Accès admin autorisé :", req.user);
  next();
};
