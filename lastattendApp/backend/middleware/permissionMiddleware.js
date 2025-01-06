const Organizer = require('../models/Organizer');

const permissionMiddleware = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const { email } = req.body;
      const organizer = await Organizer.findOne({ where: { email } });

      if (!organizer) {
        return res.status(404).json({ error: 'Organizer not found' });
      }

      const hasPermission = organizer.permissions === requiredPermission || organizer.permissions === 'admin';

      if (!hasPermission) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
};

module.exports = permissionMiddleware;
