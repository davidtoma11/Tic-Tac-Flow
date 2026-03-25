import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SoloMode.css';
import backButton from '../assets/backButton.png';
import playButton from '../assets/playButton.png';
import botAnisia from '../assets/bots/AnisiaCard.png';
import botAustin from '../assets/bots/AustinCard.png';
import botFabio from '../assets/bots/FabioCard.png';
import botMark from '../assets/bots/MarkCard.png';
import botMira from '../assets/bots/MiraCard.png';
import botToby from '../assets/bots/TobyCard.png';
import discAnisia from '../assets/discs/bots/Anisia.png';
import discAustin from '../assets/discs/bots/Austin.png';
import discFabio from '../assets/discs/bots/Fabio.png';
import discMark from '../assets/discs/bots/Mark.png';
import discMira from '../assets/discs/bots/Mira.png';
import discToby from '../assets/discs/bots/Toby.png';
import soloBg from '../assets/secondPageBG.png';

const bots = [
  {
    id: 'mira',
    name: 'MIRA',
    difficulty: 'ADAPTIVE',
    description: 'Mirrors your every move, evolves as duel unfolds.',
    card: botMira,
    disc: discMira
  },
  {
    id: 'austin',
    name: 'AUSTIN',
    difficulty: 'NOVICE',
    description: 'Still learning to navigate the intricate flow of the board.',
    card: botAustin,
    disc: discAustin
  },
  {
    id: 'fabio',
    name: 'FABIO',
    difficulty: 'INTERMEDIATE',
    description: 'Unpredictable, might win or lose.',
    card: botFabio,
    disc: discFabio
  },
  {
    id: 'anisia',
    name: 'ANISIA',
    difficulty: 'ADVANCED',
    description: 'Excels at defensive maneuvers and elegant traps.',
    card: botAnisia,
    disc: discAnisia
  },
  {
    id: 'mark',
    name: 'MARK',
    difficulty: 'MASTER',
    description: 'Reads your patterns and always keeps you on your toes.',
    card: botMark,
    disc: discMark
  },
  {
    id: 'toby',
    name: 'TOBY',
    difficulty: 'HIMSELF',
    description: 'Wishes you the best of luck.',
    card: botToby,
    disc: discToby
  }
];

const SoloMode = () => {
  const navigate = useNavigate();
  const [currentBot, setCurrentBot] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const cardRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleSwipe = (direction) => {
    if (isAnimating) return;
    
    if (direction === 'left' && currentBot < bots.length - 1) {
      setIsAnimating(true);
      setSwipeDirection('left');
      setTimeout(() => {
        setCurrentBot(currentBot + 1);
        setSwipeDirection(null);
        setIsAnimating(false);
      }, 150);
    } else if (direction === 'right' && currentBot > 0) {
      setIsAnimating(true);
      setSwipeDirection('right');
      setTimeout(() => {
        setCurrentBot(currentBot - 1);
        setSwipeDirection(null);
        setIsAnimating(false);
      }, 150);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = Math.abs(touchStartY.current - touchEndY);
    
    const swipeThreshold = 30;
    
    if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > diffY) {
      if (diffX > 0) {
        handleSwipe('left');
      } else {
        handleSwipe('right');
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handleSwipe('right');
      } else if (e.key === 'ArrowRight') {
        handleSwipe('left');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentBot, isAnimating]);

  const bot = bots[currentBot];

  const getCardClassName = () => {
    let className = 'bot-card';
    if (swipeDirection === 'left') className += ' swipe-left';
    if (swipeDirection === 'right') className += ' swipe-right';
    return className;
  };

  return (
    <div className="solo-mode-page">
      <img src={soloBg} alt="Background" className="solo-background" />
      
      <div className="cards-container">
        <div 
          ref={cardRef}
          className={getCardClassName()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img 
            src={backButton} 
            alt="Back" 
            className="back-btn" 
            onClick={() => navigate('/')} 
          />
          
          <img src={bot.disc} alt={bot.name} className="bot-disc" />
          
          <img src={bot.card} alt={bot.name} className="bot-card-image" />
          
          <div className="bot-name">{bot.name}</div>
          <div className="bot-description">{bot.description}</div>
          <div className="bot-difficulty">{bot.difficulty}</div>
          
          <img 
            src={playButton} 
            alt="Play" 
            className="play-btn" 
          />
        </div>
      </div>
      
      <div className="pagination-dots">
        {bots.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === currentBot ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SoloMode;
