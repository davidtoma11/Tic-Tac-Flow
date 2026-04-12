import React from 'react';
import { motion } from 'framer-motion';
import background from '../assets/firstPageBG.png';
import mainTitle from '../assets/tmainTitle.png';
import soloCard from '../assets/soloModeCard.png';
import duelCard from '../assets/duelModeCard.png';

const Home = ({ onSoloClick, onDuelClick }) => {
  return (
    <div style={{ 
      position: 'relative',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      height: '100%', 
      width: '100%',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '40px 20px'
    }}>
      {/* Bottom fade gradient */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '30%',
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Main header */}
      <img src={mainTitle} alt="Tic-Tac-Flow Title" style={{ width: '85%', marginTop: '20px', zIndex: 1 }} />

      {/* Mode selection cards */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '20px', 
        width: '100%', 
        zIndex: 1,
        marginBottom: '40px'
      }}>
        <motion.img 
          src={soloCard} 
          alt="Solo Mode"
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.95 }}
          style={{ width: '48%', cursor: 'pointer' }}
          onClick={onSoloClick}
        />
        <motion.img 
          src={duelCard} 
          alt="Duel Mode"
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.95 }}
          style={{ width: '48%', cursor: 'pointer' }}
          onClick={onDuelClick}
        />
      </div>
    </div>
  );
};

export default Home;
