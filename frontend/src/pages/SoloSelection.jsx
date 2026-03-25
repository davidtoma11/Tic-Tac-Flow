import React from 'react';
import '../styles/IndustrialTheme.css';
import { Link } from 'react-router-dom';
import heroAsset from '../assets/hero.png';

const SoloSelection = () => {
  const robots = [
    { id: 'easy', name: 'Zappy', difficulty: 'Easy', class: 'diff-easy' },
    { id: 'medium', name: 'Bolt', difficulty: 'Medium', class: 'diff-medium' },
    { id: 'hard', name: 'Titan', difficulty: 'Hard', class: 'diff-hard' }
  ];

  return (
    <div className="industrial-container">
      {/* Subtle Runic Background */}
      <div className="runic-bg">
        <span>ᚦᚠᚢᚦᚨᚱᚲ</span>
      </div>

      {/* Decorative Hero Asset */}
      <img src={heroAsset} alt="" className="hero-deco" />

      <header className="industrial-header">
        <h1 className="metallic-text">Protocol Solo</h1>
      </header>

      <div className="industrial-content">
        {robots.map((robot) => (
          <Link key={robot.id} to="/maintenance" className={`asymmetric-card ${robot.class}`}>
            <div className="gear-deco">
              <div className="gear-inner"></div>
            </div>
            <div className="card-info">
              <h3>{robot.name}</h3>
              <span className="card-subtitle">{robot.difficulty} Engine</span>
            </div>
          </Link>
        ))}
      </div>
      
      <Link to="/" className="industrial-back">Terminate Protocol</Link>
    </div>
  );
};

export default SoloSelection;
