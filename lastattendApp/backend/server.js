const express = require('express');
const bodyParser = require('body-parser');
const organizerRoutes = require('./routes/organizerRoutes');
const { Sequelize } = require('sequelize');
const Organizer = require('./models/Organizer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Initialize Sequelize and connect to the database
const sequelize = new Sequelize('lastattend', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Initialize models
Organizer.init(sequelize);

// Routes
app.use(organizerRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
