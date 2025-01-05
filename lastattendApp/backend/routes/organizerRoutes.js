const express = require('express');
const router = express.Router();
const { addOrganizer } = require('../controllers/organizerController');

router.post('/api/add-organizer', addOrganizer);

module.exports = router;
