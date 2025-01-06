const axios = require('axios');
const qs = require('qs');

const sendWhatsAppMessage = async (phone, message) => {
  const url = 'https://api.whatsapp.com/send';
  const data = qs.stringify({
    phone,
    text: message,
  });

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return { success: true, message: 'WhatsApp message sent successfully', response: response.data };
  } catch (error) {
    return { success: false, message: 'Failed to send WhatsApp message', error };
  }
};

module.exports = { sendWhatsAppMessage };
