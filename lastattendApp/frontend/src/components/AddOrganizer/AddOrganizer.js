import React, { useState } from 'react';
import './AddOrganizer.css';

const AddOrganizer = ({ onOrganizerAdded }) => {
  const [organizerEmail, setOrganizerEmail] = useState('');
  const [permissions, setPermissions] = useState('read');
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setOrganizerEmail(e.target.value);
  };

  const handlePermissionsChange = (e) => {
    setPermissions(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('https://lastattendapp-backend.cloud-stacks.com/api/organizer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: organizerEmail,
          permissions,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add organizer');
      }

      const result = await response.json();
      onOrganizerAdded(result);
      setOrganizerEmail('');
      setPermissions('read');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="add-organizer">
      <h2>Add Organizer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Organizer Email"
          value={organizerEmail}
          onChange={handleEmailChange}
          required
        />
        <select value={permissions} onChange={handlePermissionsChange}>
          <option value="read">Read</option>
          <option value="write">Write</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Add Organizer</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default AddOrganizer;