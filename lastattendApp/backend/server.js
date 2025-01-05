const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
app.use(bodyParser.json());

// Connect to the database
const db = new sequelize('lastattend', 'root', 'root', {
  host: 'db',
  dialect: 'mysql',
  port: 3306
});

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Use routes
app.use('/api', userRoutes);

// Protect routes with authentication middleware
app.use(authMiddleware);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
