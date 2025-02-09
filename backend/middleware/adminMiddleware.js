const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // L'utilisateur est admin, on passe à la suite
  } else {
    res
      .status(403)
      .json({ message: "Accès interdit, privilèges administrateur requis" });
  }
};

module.exports = admin;
