const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const attendeeRoutes = require('./routes/attendeeRoutes');
const { sendEmail } = require('./utils/emailUtil');
const { sendWhatsAppMessage } = require('./utils/whatsappUtil');

// Load environment variables from .env file
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', attendeeRoutes);

// Endpoint to send invitations via email
app.post('/send-email', async (req, res) => {
  const { email, message } = req.body;

  try {
    const result = await sendEmail(email, 'Invitation', message);
    if (result.success) {
      res.status(200).json({ message: 'Email sent successfully' });
    } else {
      res.status(500).json({ error: 'Failed to send email', details: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while sending email', details: error });
  }
});

// Endpoint to send invitations via WhatsApp
app.post('/send-whatsapp', async (req, res) => {
  const { phone, message } = req.body;

  try {
    const result = await sendWhatsAppMessage(phone, message);
    if (result.success) {
      res.status(200).json({ message: 'WhatsApp message sent successfully' });
    } else {
      res.status(500).json({ error: 'Failed to send WhatsApp message', details: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while sending WhatsApp message', details: error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
