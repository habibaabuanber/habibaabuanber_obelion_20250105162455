import React, { useState } from 'react';
import './Register.css';

const Register = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    familyName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://lastattendapp-backend.cloud-stacks.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Registration successful:', data.message);
      } else {
        console.error('Registration error:', data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleLogin = async (method) => {
    try {
      const credentials = method === 'email'
        ? { email: formData.email, password: formData.password }
        : { phoneNumber: formData.phoneNumber, password: formData.password };
      
      const response = await fetch('https://lastattendapp-backend.cloud-stacks.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        onLoginSuccess(data.token);
      } else {
        console.error('Login error:', data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch('https://lastattendapp-backend.cloud-stacks.com/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Password reset:', data.message);
      } else {
        console.error('Password reset error:', data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="familyName"
          placeholder="Family Name"
          value={formData.familyName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <button onClick={() => handleLogin('email')}>Login with Email</button>
      <button onClick={() => handleLogin('phone')}>Login with Phone Number</button>
      <button onClick={() => handleLogin('google')}>Login with Google</button>
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default Register;