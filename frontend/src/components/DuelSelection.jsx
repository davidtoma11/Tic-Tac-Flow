import React, { useRef, useState, useEffect } from 'react';
import background from '../assets/secondPageBG.png';
import backButton from '../assets/backButton.png';
import playButton from '../assets/playButton.png';
import localModeCard from '../assets/localModeCard.png';
import onlineModeCard from '../assets/onlineModeCard.png';

const duelModes = [
  { id: 1, name: 'Local', difficulty: 'Same Screen', description: 'Play with a friend on the same device', image: localModeCard },
  { id: 2, name: 'Online', difficulty: 'Private Rooms', description: 'Challenge players from around the world', image: onlineModeCard },
];

const DuelSelection = ({ onBackClick, onPlayClick }) => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToSlide = (index) => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      container.scrollTo({
        left: container.clientWidth * index,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        const scrollLeft = sliderRef.current.scrollLeft;
        const clientWidth = sliderRef.current.clientWidth;
        const newIndex = Math.round(scrollLeft / clientWidth);
        setCurrentIndex(newIndex);
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScroll);
      return () => slider.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div style={{ 
      position: 'relative',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100%', 
      width: '100%',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 0
      }} />

      {/* Snap-scroll carousel */}
      <div 
        className="bot-slider"
        ref={sliderRef}
        style={{ 
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          width: '95%',
          height: '80%',
          zIndex: 1
        }}
      >
        {duelModes.map((mode, index) => (
          <div
            key={mode.id}
            id={`slide-${index + 1}`}
            style={{
              scrollSnapAlign: 'start',
              flexShrink: 0,
              width: '100%',
              height: '100%',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* Mode card image */}
            <img 
              src={mode.image} 
              alt={mode.name}
              style={{ 
                width: '100%', 
                height: '100%',
                objectFit: 'contain'
              }} 
            />

            {/* Mode details */}
            <div style={{
              position: 'absolute',
              zIndex: 1,
              left: '5%',
              top: '60%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}>
              <div style={{ 
                fontSize: '1.8rem', 
                fontWeight: '500', 
                fontFamily: 'Orbitron, sans-serif',
                marginBottom: '6px',
                textTransform: 'uppercase',
                color: 'white',
                textShadow: '0px 4px 4px #000'
              }}>{mode.difficulty}</div>
              <div style={{ 
                fontSize: '2.8rem', 
                fontWeight: '900', 
                fontFamily: 'Orbitron, sans-serif',
                marginBottom: '6px',
                textTransform: 'uppercase',
                color: 'white',
                textShadow: '0px 4px 4px #000'
              }}>{mode.name}</div>
              <div style={{ 
                fontSize: '0.9rem', 
                fontWeight: '500', 
                fontFamily: 'Orbitron, sans-serif',
                color: 'white',
                textShadow: '0px 4px 4px #000',
                maxWidth: '180px'
              }}>{mode.description}</div>
            </div>

            {/* Top-left back button */}
            <img 
              src={backButton} 
              alt="Back"
              onClick={onBackClick}
              className="btn-motion"
              style={{ 
                position: 'absolute',
                top: '3%',
                left: '8%',
                width: '23%',
                maxWidth: '145px',
              }}
            />

            {/* Bottom-right play button */}
            <img 
              src={playButton} 
              alt="Play"
              onClick={() => onPlayClick(mode.name)}
              className="btn-motion"
              style={{ 
                position: 'absolute',
                bottom: '5%',
                right: '8%',
                width: '35%',
                maxWidth: '200px',
              }}
            />
          </div>
        ))}
      </div>

      {/* Slide navigation indicators */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginTop: '20px',
        zIndex: 1
      }}>
        {duelModes.map((_, index) => (
          <div 
            key={index}
            onClick={() => scrollToSlide(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: index === currentIndex ? '#fff' : 'rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: index === currentIndex ? '0 0 10px rgba(255,255,255,0.8)' : 'none'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DuelSelection;
