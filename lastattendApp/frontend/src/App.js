import React, { useState, useEffect, useContext, createContext } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Register from './components/Register/Register.js';
import Login from './components/Login/Login.js';
import PasswordRecovery from './components/PasswordRecovery/PasswordRecovery.js';
import AddOrganizer from './components/AddOrganizer/AddOrganizer.js';
import AddAttendee from './components/AddAttendee/AddAttendee.js';
import RSVPTracking from './components/RSVPTracking/RSVPTracking.js';

const AuthContext = createContext();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Assume verifyToken is a function that verifies the token with the backend
      verifyToken(token).then(valid => {
        setIsAuthenticated(valid);
        if (!valid) localStorage.removeItem('authToken');
      });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <div>
        <nav role="navigation" style={{ backgroundColor: '#f8f9fa', padding: '10px' }}>
          {isAuthenticated ? (
            <>
              <Link to="/add-organizer" style={{ margin: '0 10px' }}>Add Organizer</Link>
              <Link to="/add-attendee" style={{ margin: '0 10px' }}>Add Attendee</Link>
              <Link to="/rsvp-tracking" style={{ margin: '0 10px' }}>RSVP Tracking</Link>
              <button onClick={logout} style={{ margin: '0 10px' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>
              <Link to="/register" style={{ margin: '0 10px' }}>Register</Link>
            </>
          )}
        </nav>
        <main style={{ minHeight: 'calc(100vh - 60px - 40px)', padding: '20px' }}>
          <Routes>
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login onLoginSuccess={login} /></PublicRoute>} />
            <Route path="/password-recovery" element={<PublicRoute><PasswordRecovery /></PublicRoute>} />
            <Route path="/add-organizer" element={<ProtectedRoute><AddOrganizer /></ProtectedRoute>} />
            <Route path="/add-attendee" element={<ProtectedRoute><AddAttendee /></ProtectedRoute>} />
            <Route path="/rsvp-tracking" element={<ProtectedRoute><RSVPTracking /></ProtectedRoute>} />
          </Routes>
        </main>
        <footer style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f1f1f1', position: 'fixed', bottom: 0, width: '100%' }}>
          &copy; 2024 lastattend App. All rights reserved
        </footer>
      </div>
    </AuthContext.Provider>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? children : <Navigate to="/add-organizer" />;
};

const verifyToken = async (token) => {
  // Simulated token verification
  return true;
};

export default App;