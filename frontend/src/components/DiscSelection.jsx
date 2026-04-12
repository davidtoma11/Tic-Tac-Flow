import React, { useState } from 'react';
import background from '../assets/secondPageBG.png';
import backButton from '../assets/backButton.png';

// Import discs
import blueDisc from '../assets/discs/blue.png';
import bronzeDisc from '../assets/discs/bronze.png';
import goldDisc from '../assets/discs/gold.png';
import goldMetallicDisc from '../assets/discs/goldMetallic.png';
import goldSpecialDisc from '../assets/discs/goldSpecial.png';
import metalDisc from '../assets/discs/metal.png';
import powderCoatedDisc from '../assets/discs/powderCoated.png';
import redDisc from '../assets/discs/red.png';
import rustedDisc from '../assets/discs/rusted.png';
import silverCircularDisc from '../assets/discs/silverCircular.png';
import silverMetallicDisc from '../assets/discs/silverMetallic.png';
import turquoiseDisc from '../assets/discs/turquoise.png';

const ALL_DISCS = [
  { id: 'red', img: redDisc, name: 'Crimson Core' },
  { id: 'blue', img: blueDisc, name: 'Azure Flow' },
  { id: 'gold', img: goldDisc, name: 'Royal Gold' },
  { id: 'goldMetallic', img: goldMetallicDisc, name: 'Aurum Metal' },
  { id: 'goldSpecial', img: goldSpecialDisc, name: 'Solar Flare' },
  { id: 'bronze', img: bronzeDisc, name: 'Ancient Bronze' },
  { id: 'metal', img: metalDisc, name: 'Iron Forge' },
  { id: 'powderCoated', img: powderCoatedDisc, name: 'Matte Obsidian' },
  { id: 'rusted', img: rustedDisc, name: 'Forgotten Relic' },
  { id: 'silverCircular', img: silverCircularDisc, name: 'Lunar Silver' },
  { id: 'silverMetallic', img: silverMetallicDisc, name: 'Chrome Steel' },
  { id: 'turquoise', img: turquoiseDisc, name: 'Oceanic Teal' },
];

const DiscSelection = ({ onSelectionComplete, onBackClick }) => {
  const [player1Disc, setPlayer1Disc] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // 1 for P1, 2 for P2

  const handleDiscSelect = (disc) => {
    if (currentStep === 1) {
      setPlayer1Disc(disc);
      setCurrentStep(2);
    } else {
      // Wait a bit to show selection before completing
      setTimeout(() => {
        onSelectionComplete(player1Disc, disc);
      }, 300);
    }
  };

  return (
    <div style={{
      position: 'relative',
      height: '100%',
      width: '100%',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Dark Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        zIndex: 0
      }} />

      {/* Dynamic Player Indicator - Minimalist */}
      <div style={{
        zIndex: 1,
        marginTop: 60,
        marginBottom: 30,
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
          letterSpacing: 4,
          marginBottom: 8
        }}>Selection Phase</div>
        <div style={{
          fontSize: '1.8rem',
          fontFamily: 'Orbitron, sans-serif',
          color: '#fff',
          textTransform: 'uppercase',
          letterSpacing: 2,
          textShadow: '0 0 20px rgba(255,255,255,0.3)'
        }}>
          Player <span style={{ color: '#ffd700' }}>{currentStep}</span>
        </div>
        <div style={{
          width: 60,
          height: 2,
          background: '#ffd700',
          margin: '15px auto 0',
          boxShadow: '0 0 10px #ffd700'
        }} />
      </div>

      {/* Premium Gallery - 2 per row */}
      <div style={{
        zIndex: 1,
        width: '100%',
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 25,
        padding: '0 30px 120px',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {ALL_DISCS.map((disc) => {
          const isP1Selected = player1Disc?.id === disc.id;
          const isDisabled = isP1Selected;
          
          return (
            <div 
              key={disc.id}
              className={!isDisabled ? "btn-motion" : ""}
              onClick={() => !isDisabled && handleDiscSelect(disc)}
              style={{
                aspectRatio: '1/1.2',
                position: 'relative',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                borderRadius: 15,
                border: isP1Selected 
                  ? '1px solid rgba(255, 215, 0, 0.5)' 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 15,
                opacity: isDisabled && currentStep === 2 ? 0.2 : 1,
                boxShadow: isP1Selected 
                  ? '0 0 30px rgba(255, 215, 0, 0.15), inset 0 0 15px rgba(255, 215, 0, 0.05)' 
                  : '0 10px 30px rgba(0,0,0,0.5)',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Decorative Corner Lines */}
              <div style={{ position: 'absolute', top: 10, left: 10, width: 10, height: 10, borderTop: '1px solid rgba(255,255,255,0.2)', borderLeft: '1px solid rgba(255,255,255,0.2)' }} />
              <div style={{ position: 'absolute', bottom: 10, right: 10, width: 10, height: 10, borderBottom: '1px solid rgba(255,255,255,0.2)', borderRight: '1px solid rgba(255,255,255,0.2)' }} />

              {/* Disc Image */}
              <div style={{
                width: '75%',
                aspectRatio: '1/1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))'
              }}>
                <img 
                  src={disc.img} 
                  alt={disc.name} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain'
                  }} 
                />
              </div>

              {/* Disc Name - Premium detail */}
              <div style={{
                marginTop: 15,
                fontSize: '0.6rem',
                fontFamily: 'Orbitron, sans-serif',
                color: isP1Selected ? '#ffd700' : 'rgba(255,255,255,0.6)',
                textTransform: 'uppercase',
                letterSpacing: 1,
                textAlign: 'center'
              }}>
                {disc.name}
              </div>

              {isP1Selected && (
                <div style={{
                  position: 'absolute',
                  top: -8,
                  background: '#ffd700',
                  color: '#000',
                  fontSize: '0.55rem',
                  fontWeight: '900',
                  padding: '3px 10px',
                  borderRadius: 2,
                  fontFamily: 'Orbitron, sans-serif',
                  boxShadow: '0 0 15px rgba(255,215,0,0.5)'
                }}>CLAIMED BY P1</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Back Button Container */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
      }}>
        <img 
          src={backButton} 
          alt="Back"
          className="btn-motion"
          onClick={onBackClick}
          style={{ width: 130 }}
        />
      </div>

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default DiscSelection;