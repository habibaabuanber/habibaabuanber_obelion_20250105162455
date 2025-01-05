import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        familyName: '',
        email: '',
        phoneNumber: '',
        password: ''
    });

    const [isLogin, setIsLogin] = useState(true);
    const [resetEmail, setResetEmail] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleResetChange = (e) => {
        setResetEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://lastattendapp-backend.cloud-stacks.com/api/${isLogin ? 'login' : 'register'}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok && data.token) {
                onLoginSuccess(data.token);
            } else {
                console.error('Error:', data.error || 'Unexpected error');
            }
        } catch (error) {
            console.error('Error:', error.message || 'Unexpected error');
        }
    };

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://lastattendapp-backend.cloud-stacks.com/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: resetEmail }),
            });
            if (!response.ok) {
                const data = await response.json();
                console.error('Error:', data.error || 'Unexpected error');
            }
        } catch (error) {
            console.error('Error:', error.message || 'Unexpected error');
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="login-container">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="familyName"
                            placeholder="Family Name"
                            value={formData.familyName}
                            onChange={handleInputChange}
                            required
                        />
                    </>
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <button onClick={toggleMode}>
                {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </button>
            {isLogin && (
                <form onSubmit={handleResetSubmit}>
                    <input
                        type="email"
                        placeholder="Reset Email"
                        value={resetEmail}
                        onChange={handleResetChange}
                        required
                    />
                    <button type="submit">Reset Password</button>
                </form>
            )}
        </div>
    );
};

export default Login;