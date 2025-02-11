const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Accès interdit, privilèges administrateur requis" });
  }
};

module.exports = admin;
