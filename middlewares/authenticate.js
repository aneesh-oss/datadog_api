const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET; // Load from environment variable

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.sendStatus(403); // Forbidden

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user; // Save user info in request object
    next();
  });
};

module.exports = authenticateToken;
