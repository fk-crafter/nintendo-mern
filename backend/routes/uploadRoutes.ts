import express, { Request, Response, Router, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

// Assure-toi que le dossier "uploads" existe
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration de multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route POST pour uploader une image
router.post(
  "/",
  upload.single("image"),
  (req: Request, res: Response, next: NextFunction): void => {
    if (!req.file) {
      res.status(400).json({ message: "Aucun fichier n'a été téléchargé." });
      return;
    }

    const imageUrl = `${process.env.BACKEND_URL}/uploads/${req.file.filename}`;

    res.status(201).json({ imageUrl });
  }
);

export default router;
