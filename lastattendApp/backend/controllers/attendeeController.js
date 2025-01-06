const Attendee = require('../models/Attendee');

// Function to add a new attendee
exports.addAttendee = async (req, res) => {
  const { email, whatsapp } = req.body;
  
  try {
    const newAttendee = await Attendee.create({ email, whatsapp });
    res.status(201).json(newAttendee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add attendee' });
  }
};

// Function to get all attendees
exports.getAttendees = async (req, res) => {
  try {
    const attendees = await Attendee.findAll();
    res.status(200).json(attendees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve attendees' });
  }
};

// Function to update RSVP status
exports.updateRSVP = async (req, res) => {
  const { id } = req.params;
  const { rsvp } = req.body;

  try {
    const attendee = await Attendee.findByPk(id);
    if (attendee) {
      attendee.rsvp = rsvp;
      await attendee.save();
      res.status(200).json(attendee);
    } else {
      res.status(404).json({ error: 'Attendee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update RSVP status' });
  }
};

// Function to delete an attendee
exports.deleteAttendee = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Attendee.destroy({ where: { id } });
    if (result) {
      res.status(200).json({ message: 'Attendee deleted successfully' });
    } else {
      res.status(404).json({ error: 'Attendee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete attendee' });
  }
};
