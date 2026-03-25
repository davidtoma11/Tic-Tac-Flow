import React from 'react';
import '../styles/IndustrialTheme.css';
import { Link } from 'react-router-dom';
import logoAsset from '../assets/picLogo.png';

const DuelSelection = () => {
  return (
    <div className="industrial-container">
      <div className="runic-bg">
        <span>ᛗᛟᚱᛏᚨᛚ</span>
      </div>

      <header className="industrial-header">
        <h1 className="metallic-text">Conflict Mode</h1>
      </header>

      <div className="industrial-content">
        <Link to="/game" className="asymmetric-card diff-medium">
          <div className="gear-deco">
            <div className="gear-inner"></div>
          </div>
          <div className="card-info">
            <h3>Local PvP</h3>
            <span className="card-subtitle">Direct Combat</span>
          </div>
        </Link>
        
        <Link to="/maintenance" className="asymmetric-card diff-hard">
          <div className="gear-deco">
            <div className="gear-inner"></div>
          </div>
          <div className="card-info">
            <h3>Online PvP</h3>
            <span className="card-subtitle">Remote Interface</span>
          </div>
        </Link>

        {/* Logo as an asymmetric decorative element at the bottom of content */}
        <div style={{ alignSelf: 'center', marginTop: '40px', opacity: 0.5 }}>
            <img src={logoAsset} alt="Logo" style={{ width: '150px', filter: 'grayscale(1) brightness(0.8)' }} />
        </div>
      </div>
      
      <Link to="/" className="industrial-back">Abort Conflict</Link>
    </div>
  );
};

export default DuelSelection;
