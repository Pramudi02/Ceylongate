import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.page.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="notfound-container">
        <div className="notfound-animation">
          <span className="float-icon icon-1">✈️</span>
          <span className="float-icon icon-2">🏝️</span>
          <span className="float-icon icon-3">🧳</span>
        </div>

        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          Oops! The page you're looking for seems to have wandered off on its own adventure.
        </p>

        <div className="notfound-actions">
          <button className="btn-primary" onClick={() => navigate('/dashboard')}>
            🏠 Back to Dashboard
          </button>
          <button className="btn-secondary" onClick={() => navigate('/trips')}>
            🧳 View Trips
          </button>
        </div>

        <p className="help-text">
          Need help? Contact support at <a href="mailto:support@ceylongate.com">support@ceylongate.com</a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
