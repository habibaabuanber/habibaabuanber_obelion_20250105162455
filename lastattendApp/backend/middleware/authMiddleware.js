const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify token and authenticate user
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Access denied. Invalid token.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
