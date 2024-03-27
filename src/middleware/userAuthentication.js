const jwt = require("jsonwebtoken");

// Middleware to verify the access token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Access token is missing" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid access token" });
    }
    req.user = user;
    next();
  });
};

// Controller that requires access token
const secureController = (req, res) => {
  res
    .status(200)
    .json({ message: "This is a secure endpoint", user: req.user });
};

module.exports = {
  secureController,
  authenticateToken,
};
