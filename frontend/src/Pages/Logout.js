import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import '../Style/Auth.css';

const Logout = () => {
  const navigate = useNavigate();
  const [logoutMessage, setLogoutMessage] = useState('Logging out...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Attempt server logout
        await api.auth.logout();
        
        // Clear local storage regardless of server response
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Redirect to login page with success state
        navigate('/login', { state: { logoutSuccess: true } });
      } catch (error) {
        console.error('Logout error:', error);
        setError(error.message || 'Logout failed');
        
        // Still clear local storage even if server logout failed
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Redirect after showing error briefly
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        {error ? (
          <>
            <h2>Logout Error</h2>
            <p className="error-message">{error}</p>
            <p>Redirecting to login page...</p>
          </>
        ) : (
          <>
            <h2>Logging Out</h2>
            <p>{logoutMessage}</p>
            <div className="loading-spinner"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Logout;