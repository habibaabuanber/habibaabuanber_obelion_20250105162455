import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddAttendee.css';

const AddAttendee = ({ onLoginSuccess }) => {
  const [attendees, setAttendees] = useState([]);
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await axios.get('https://lastattendapp-backend.cloud-stacks.com/api/attendees');
        setAttendees(response.data);
      } catch (error) {
        console.error('Failed to fetch attendees:', error);
      }
    };
    fetchAttendees();
  }, []);

  const handleAddAttendee = async () => {
    try {
      const response = await axios.post('https://lastattendapp-backend.cloud-stacks.com/api/attendees', { email, whatsapp });
      setAttendees([...attendees, response.data]);
      setEmail('');
      setWhatsapp('');
    } catch (error) {
      console.error('Failed to add attendee:', error);
    }
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSendInvitations = async () => {
    const message = 'You are invited!';
    for (const attendee of attendees) {
      try {
        if (attendee.email) {
          await axios.post('https://lastattendapp-backend.cloud-stacks.com/send-email', {
            email: attendee.email,
            message,
          });
        }
        if (attendee.whatsapp) {
          await axios.post('https://lastattendapp-backend.cloud-stacks.com/send-whatsapp', {
            phone: attendee.whatsapp,
            message,
          });
        }
      } catch (error) {
        console.error('Failed to send invitation:', error);
      }
    }
  };

  const handleLoginSuccess = (token) => {
    if (onLoginSuccess) {
      onLoginSuccess(token);
    }
  };

  return (
    <div className="add-attendee">
      <h2>Add and Manage Attendees</h2>
      <div>
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter WhatsApp Number"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />
        <button onClick={handleAddAttendee}>Add Attendee</button>
      </div>
      <div>
        <input type="file" onChange={handleFileUpload} />
        <button onClick={handleSendInvitations}>Send Invitations</button>
      </div>
      <ul>
        {attendees.map((attendee, index) => (
          <li key={index}>
            {attendee.email} - {attendee.whatsapp} - RSVP: {attendee.rsvp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddAttendee;