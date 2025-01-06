const express = require('express');
const router = express.Router();
const attendeeController = require('../controllers/attendeeController');

router.post('/attendees', attendeeController.addAttendee);
router.get('/attendees', attendeeController.getAttendees);
router.put('/attendees/:id/rsvp', attendeeController.updateRSVP);
router.delete('/attendees/:id', attendeeController.deleteAttendee);

module.exports = router;
