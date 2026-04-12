import React from 'react';
import background from '../assets/secondPageBG.png';
import mainTitle from '../assets/tmainTitle.png';
import scoreboardImg from '../assets/scoreboard.png';
import discRed from '../assets/discs/red.png';
import discBlue from '../assets/discs/blue.png';
import homeButton from '../assets/homeButton.png';
import resetButton from '../assets/resetButton.png';
import boardImg from '../assets/board.png';

const DISCS = [discRed, discBlue];

const GameBoard = ({ mode, onHomeClick, currentPlayer = 'red' }) => {
  const playerDisc = currentPlayer === 'red' ? DISCS[0] : DISCS[1];
  return (
    <div style={{
      position: 'relative',
      height: '100%',
      width: '100%',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>

      {/* Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
      }} />

      {/* Top - Title & Mode */}
      <div style={{
        position: 'absolute',
        top: 40,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <img src={mainTitle} alt="Tic-Tac-Flow" style={{ width: '80%' }} />

        {/* Mode text */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 25, height: 2, background: 'linear-gradient(to right, transparent, #ffd700, #fff)', borderRadius: 2 }} />
          <span style={{ fontSize: '0.7rem', fontFamily: 'Arial', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>{mode} Mode</span>
          <div style={{ width: 25, height: 2, background: 'linear-gradient(to left, transparent, #ffd700, #fff)', borderRadius: 2 }} />
        </div>
      </div>

      {/* Scoreboard */}
      <div style={{
        position: 'absolute',
        top: '18%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <img src={scoreboardImg} alt="Scoreboard" style={{ width: '80%' }} />

        <div style={{
          position: 'absolute',
          width: '55%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}>
          <img src={DISCS[0]} alt="P1" style={{ width: 35 }} />
          <span style={{ fontSize: '2.2rem', fontFamily: 'Arial', color: '#fff' }}>0</span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffd700', boxShadow: '0 0 15px #ffd700, 0 0 30px #ffd700' }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffd700', boxShadow: '0 0 15px #ffd700, 0 0 30px #ffd700' }} />
          </div>

          <span style={{ fontSize: '2.2rem', fontFamily: 'Arial', color: '#fff' }}>0</span>
          <img src={DISCS[1]} alt="P2" style={{ width: 35 }} />
        </div>
      </div>

      {/* Board Container */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '93%',
        aspectRatio: '1/1'
      }}>
        {/* Board Image */}
        <img
          src={boardImg}
          alt="Board"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />

        {/* Glowing horizontal lines - between placeholders */}
        <div style={{
          position: 'absolute',
          top: '36%',
          left: '8%',
          right: '8%',
          height: 2,
          background: 'linear-gradient(to right, transparent, rgba(241,213,168,0.4), rgba(255,255,255,0.6), rgba(241,213,168,0.4), transparent)',
          boxShadow: '0 0 6px rgba(241,213,168,0.3)',
          opacity: 0.4
        }} />
        <div style={{
          position: 'absolute',
          top: '61%',
          left: '8%',
          right: '8%',
          height: 2,
          background: 'linear-gradient(to right, transparent, rgba(241,213,168,0.4), rgba(255,255,255,0.6), rgba(241,213,168,0.4), transparent)',
          boxShadow: '0 0 6px rgba(241,213,168,0.3)',
          opacity: 0.4
        }} />

        {/* Glowing vertical lines - between placeholders */}
        <div style={{
          position: 'absolute',
          left: '35%',
          top: '8%',
          bottom: '8%',
          width: 2,
          background: 'linear-gradient(to bottom, transparent, rgba(241,213,168,0.4), rgba(255,255,255,0.6), rgba(241,213,168,0.4), transparent)',
          boxShadow: '0 0 6px rgba(241,213,168,0.3)',
          opacity: 0.4
        }} />
        <div style={{
          position: 'absolute',
          left: '65%',
          top: '8%',
          bottom: '8%',
          width: 2,
          background: 'linear-gradient(to bottom, transparent, rgba(241,213,168,0.4), rgba(255,255,255,0.6), rgba(241,213,168,0.4), transparent)',
          boxShadow: '0 0 8px rgba(241,213,168,0.4)',
          opacity: 0.4
        }} />

        {/* 9 Placeholder discs - on the board surface */}
        {[
          { col: '20%', row: '24%' },  // top-left
          { col: '50%', row: '24%' },  // top-center
          { col: '80%', row: '24%' }, // top-right
          { col: '20%', row: '49%' }, // middle-left
          { col: '50%', row: '49%' }, // center
          { col: '80%', row: '49%' }, // middle-right
          { col: '20%', row: '74%' }, // bottom-left
          { col: '50%', row: '74%' }, // bottom-center
          { col: '80%', row: '74%' }  // bottom-right
        ].map((pos, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: pos.row,
            left: pos.col,
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: 83,
              aspectRatio: '1/1',
              borderRadius: '50%',
              border: '4px solid transparent',
              backgroundImage: 'linear-gradient(#0a0a0a, #0a0a0a), linear-gradient(to bottom right, #47453f, #2a2924)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              boxShadow: 'inset 0 10px 25px hsla(0, 0%, 0%, 0.90), inset 0 -4px 15px rgba(40,40,40,0.5), 0 2px 4px rgba(0,0,0,0.4)'
            }} />
          </div>
        ))}
      </div>

      {/* Turn indicator */}
      <div style={{
        position: 'absolute',
        bottom: '23%',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        opacity: 0.5
      }}>
        <div style={{ width: 20, height: 2, background: 'linear-gradient(to right, transparent, #ffd700, #fff)', borderRadius: 2 }} />
        <span style={{
          fontSize: '0.8rem',
          fontFamily: 'Arial',
          color: '#fff',
          textTransform: 'uppercase',
          letterSpacing: 1
        }}>
          Player
        </span>
        <img src={playerDisc} alt="Player" style={{ width: 20 }} />
        <span style={{
          fontSize: '0.8rem',
          fontFamily: 'Arial',
          color: '#fff',
          textTransform: 'uppercase',
        }}>
          's Turn
        </span>
        <div style={{ width: 20, height: 2, background: 'linear-gradient(to left, transparent, #ffd700, #fff)', borderRadius: 2 }} />
      </div>

      {/* Buttons */}
      <div style={{
        position: 'absolute',
        bottom: 75,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 30,
        width: '70%',
        justifyContent: 'center'
      }}>
        <img
          src={resetButton}
          alt="Reset"
          style={{
            width: 130,
            cursor: 'pointer',
            filter: 'brightness(0.85) contrast(1.1)'
          }}
        />
        <img
          src={homeButton}
          alt="Home"
          style={{
            width: 130,
            cursor: 'pointer',
            filter: 'brightness(0.85) contrast(1.1)'
          }}
          onClick={onHomeClick}
        />
      </div>
    </div>
  );
};

export default GameBoard;