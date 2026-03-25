import React from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

const Maintenance = () => {
  return (
    <div className="home-container">
      <div className="maintenance-content">
        <h1>Coming Soon!</h1>
        <p>This feature is currently under maintenance.</p>
        <Link to="/" className="back-link">Back to Home</Link>
      </div>
    </div>
  );
};

export default Maintenance;
