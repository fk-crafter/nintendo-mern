const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Vérifier si le token est présent dans l'en-tête Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Récupérer le token après "Bearer"

      // Vérifier et décoder le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Récupérer l'utilisateur du token (sans renvoyer le mot de passe)
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Passer à la prochaine étape (route sécurisée)
    } catch (error) {
      res.status(401).json({ message: "Accès non autorisé, token invalide" });
    }
  } else {
    res.status(401).json({ message: "Accès non autorisé, aucun token fourni" });
  }
};

module.exports = protect;
