const Organizer = require('../models/Organizer');

const addOrganizer = async (req, res) => {
  const { email, permissions } = req.body;

  try {
    const newOrganizer = await Organizer.create({ email, permissions });
    res.status(201).json(newOrganizer);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Email already exists' });
    } else if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ error: 'Invalid email format or permissions' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = {
  addOrganizer,
};
