import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// étendre l'interface Request pour inclure user
interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

// middleware pour l'authentification
export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Accès refusé, token manquant" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      role: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};

// middleware pour vérifier si un utilisateur est admin
export const adminOnly = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ message: "Accès refusé, vous devez être admin" });
    return;
  }
  next();
};
