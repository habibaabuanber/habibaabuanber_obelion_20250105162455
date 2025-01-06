import React, { useState, useEffect } from 'react';
import './RSVPTracking.css';
import { CSVReader } from 'react-papaparse';
import axios from 'axios';

const RSVPTracking = () => {
  const [attendees, setAttendees] = useState([]);
  const [newAttendee, setNewAttendee] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await axios.get('https://lastattendapp-backend.cloud-stacks.com/api/attendees');
        setAttendees(response.data);
      } catch (error) {
        console.error('Failed to fetch attendees', error);
      }
    };

    fetchAttendees();
  }, []);

  const handleAddAttendee = async () => {
    try {
      const response = await axios.post('https://lastattendapp-backend.cloud-stacks.com/api/attendees', {
        email: newAttendee.email,
        whatsapp: newAttendee.phone,
      });
      setAttendees([...attendees, { ...response.data, name: newAttendee.name }]);
      setNewAttendee({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Failed to add attendee', error);
    }
  };

  const handleCSVUpload = async (data) => {
    const parsedData = data.map(row => ({
      name: row.data[0],
      email: row.data[1],
      phone: row.data[2],
      rsvpStatus: 'Pending',
    }));

    for (const attendee of parsedData) {
      try {
        const response = await axios.post('https://lastattendapp-backend.cloud-stacks.com/api/attendees', {
          email: attendee.email,
          whatsapp: attendee.phone,
        });
        setAttendees(prevAttendees => [...prevAttendees, { ...response.data, name: attendee.name }]);
      } catch (error) {
        console.error('Failed to add attendee from CSV', error);
      }
    }
  };

  const sendInvitation = async (attendee, method) => {
    const message = `Hi ${attendee.name}, you are invited to our event. Please RSVP.`;

    try {
      if (method === 'email') {
        await axios.post('https://lastattendapp-backend.cloud-stacks.com/send-email', {
          email: attendee.email,
          message,
        });
      } else if (method === 'whatsapp') {
        await axios.post('https://lastattendapp-backend.cloud-stacks.com/send-whatsapp', {
          phone: attendee.phone,
          message,
        });
      }

      setAttendees(prevState =>
        prevState.map(a => a.email === attendee.email ? { ...a, rsvpStatus: 'Invited' } : a)
      );
    } catch (error) {
      console.error('Failed to send invitation', error);
    }
  };

  return (
    <div className="rsvp-tracking">
      <h1>RSVP Tracking</h1>
      <input
        type="text"
        placeholder="Name"
        value={newAttendee.name}
        onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newAttendee.email}
        onChange={(e) => setNewAttendee({ ...newAttendee, email: e.target.value })}
      />
      <input
        type="tel"
        placeholder="Phone"
        value={newAttendee.phone}
        onChange={(e) => setNewAttendee({ ...newAttendee, phone: e.target.value })}
      />
      <button onClick={handleAddAttendee}>Add Attendee</button>

      <CSVReader onFileLoaded={handleCSVUpload} />

      <ul>
        {attendees.map((attendee, index) => (
          <li key={index}>
            {attendee.name} - {attendee.email} - {attendee.phone} - {attendee.rsvpStatus}
            <button onClick={() => sendInvitation(attendee, 'email')}>Send Email</button>
            <button onClick={() => sendInvitation(attendee, 'whatsapp')}>Send WhatsApp</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RSVPTracking;