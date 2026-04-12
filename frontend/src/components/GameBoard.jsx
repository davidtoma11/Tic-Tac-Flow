import React, { useState, useEffect } from 'react';
import background from '../assets/secondPageBG.png';
import mainTitle from '../assets/tmainTitle.png';
import scoreboardImg from '../assets/scoreboard.png';
import discRed from '../assets/discs/red.png';
import discBlue from '../assets/discs/blue.png';
import homeButton from '../assets/homeButton.png';
import resetButton from '../assets/resetButton.png';
import boardImg from '../assets/board.png';
import { getBotDecision } from '../utils/bots';

const GameBoard = ({ mode, onHomeClick, scores, onScoreUpdate, selectedBot, onScoreReset, customDiscs }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [moveHistory, setMoveHistory] = useState([]); // Track move sequence
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [isTie, setIsTie] = useState(false);

  // Resolve active assets
  const p1Disc = customDiscs?.p1 || discRed;
  const p2Disc = mode === 'Solo' && selectedBot ? selectedBot.disc : (customDiscs?.p2 || discBlue);

  // Round reset: persistence enabled
  useEffect(() => {
    if (winner || isTie) {
      const timer = setTimeout(() => {
        setBoard(Array(9).fill(null));
        setMoveHistory([]);
        setCurrentPlayer('red');
        setWinner(null);
        setWinningLine(null);
        setIsTie(false);
      }, 3000); // Victory display duration
      return () => clearTimeout(timer);
    }
  }, [winner, isTie]);

  useEffect(() => {
    if (mode === 'Solo' && currentPlayer === 'blue' && !winner && !isTie) {
      const timer = setTimeout(() => {
        makeBotMove();
      }, 800); // Bot latency for natural feel
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, winner, isTie]);

  const updateGameState = (index, player) => {
    let newBoard = [...board];
    let newHistory = [...moveHistory];

    // Flow logic: enforce 6-piece limit
    if (newHistory.length >= 6) {
      const oldestIndex = newHistory.shift();
      newBoard[oldestIndex] = null;
    }

    newBoard[index] = player;
    newHistory.push(index);

    setBoard(newBoard);
    setMoveHistory(newHistory);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      onScoreUpdate(result.winner);
    } else if (newBoard.every(square => square !== null) && newHistory.length < 6) {
      // Draw detection (fallback)
      setIsTie(true);
    } else {
      setCurrentPlayer(player === 'red' ? 'blue' : 'red');
    }
  };

  const makeBotMove = () => {
    const moveIndex = getBotDecision(selectedBot.name, board, moveHistory);
    if (moveIndex !== null) {
      updateGameState(moveIndex, 'blue');
    }
  };

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Win patterns
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner || isTie || (mode === 'Solo' && currentPlayer === 'blue')) return;
    updateGameState(index, currentPlayer);
  };

  const handleFullReset = () => {
    setBoard(Array(9).fill(null));
    setMoveHistory([]);
    setCurrentPlayer('red');
    setWinner(null);
    setWinningLine(null);
    setIsTie(false);
    onScoreReset();
  };

  const handleHomeClick = () => {
    onScoreReset();
    onHomeClick();
  };

  const playerDisc = currentPlayer === 'red' ? p1Disc : p2Disc;
  const winnerDisc = winner === 'red' ? p1Disc : p2Disc;

  return (
    <div style={{
      position: 'relative',
      height: '100%',
      width: '100%',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>

      {/* Scene mask */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
      }} />

      {/* Header section */}
      <div style={{
        position: 'absolute',
        top: 40,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <img src={mainTitle} alt="Tic-Tac-Flow" style={{ width: '80%' }} />

        {/* Session meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 25, height: 2, background: 'linear-gradient(to right, transparent, #ffd700, #fff)', borderRadius: 2 }} />
          <span style={{ fontSize: '0.7rem', fontFamily: 'Arial', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>{mode} Mode</span>
          <div style={{ width: 25, height: 2, background: 'linear-gradient(to left, transparent, #ffd700, #fff)', borderRadius: 2 }} />
        </div>
      </div>

      {/* Stats display */}
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
          <img src={p1Disc} alt="P1" style={{ width: 35 }} />
          <span style={{ fontSize: '2.2rem', fontFamily: 'Arial', color: '#fff' }}>{scores.red}</span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffd700', boxShadow: '0 0 15px #ffd700, 0 0 30px #ffd700' }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffd700', boxShadow: '0 0 15px #ffd700, 0 0 30px #ffd700' }} />
          </div>

          <span style={{ fontSize: '2.2rem', fontFamily: 'Arial', color: '#fff' }}>{scores.blue}</span>
          <img src={p2Disc} alt="P2" style={{ width: 35 }} />
        </div>
      </div>

      {/* Game arena */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '93%',
        aspectRatio: '1/1'
      }}>
        {/* Visual grid base */}
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

        {/* Arena accents */}
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

        {/* Interaction slots */}
        {[
          { col: '20%', row: '24%' },
          { col: '50%', row: '24%' },
          { col: '80%', row: '24%' },
          { col: '20%', row: '49%' },
          { col: '50%', row: '49%' },
          { col: '80%', row: '49%' },
          { col: '20%', row: '74%' },
          { col: '50%', row: '74%' },
          { col: '80%', row: '74%' }
        ].map((pos, i) => {
          const isOldest = !winner && moveHistory.length === 6 && moveHistory[0] === i;
          const isWinningSquare = winningLine?.includes(i);
          return (
            <div key={i} 
              onClick={() => handleClick(i)}
              style={{
                position: 'absolute',
                top: pos.row,
                left: pos.col,
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}>
              <div 
                className={isWinningSquare ? 'winning-square' : ''}
                style={{
                  width: 83,
                  aspectRatio: '1/1',
                  borderRadius: '50%',
                  border: isWinningSquare ? '1px solid #ffd700' : '4px solid transparent',
                  backgroundImage: 'linear-gradient(#0a0a0a, #0a0a0a), linear-gradient(to bottom right, #47453f, #2a2924)',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                  boxShadow: isWinningSquare 
                    ? '0 0 20px rgba(255,215,0,0.5)' 
                    : 'inset 0 10px 25px hsla(0, 0%, 0%, 0.90), inset 0 -4px 15px rgba(40,40,40,0.5), 0 2px 4px rgba(0,0,0,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 2,
                  transition: 'all 0.3s ease'
                }}
              >
                {board[i] && (
                  <img 
                    src={board[i] === 'red' ? p1Disc : p2Disc} 
                    alt={board[i]} 
                    className={`disc-pop ${isOldest ? 'disc-exit-warning' : ''}`}
                    style={{ 
                      width: '90%', 
                      height: '90%', 
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))'
                    }} 
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Status bar */}
      <div style={{
        position: 'absolute',
        bottom: '23%',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        opacity: 0.6
      }}>
        <div style={{ width: 20, height: 2, background: 'linear-gradient(to right, transparent, #ffd700, #fff)', borderRadius: 2 }} />
        <span style={{
          fontSize: '0.8rem',
          fontFamily: 'Arial',
          color: '#fff',
          textTransform: 'uppercase',
          letterSpacing: 1
        }}>
          {winner ? `Winner: ` : isTie ? `It's a Tie!` : `Player`}
        </span>
        {!winner && !isTie && <img src={playerDisc} alt="Player" style={{ width: 20 }} />}
        {winner && <img src={winnerDisc} alt="Winner" style={{ width: 20 }} />}
        {!isTie && (
          <span style={{
            fontSize: '0.8rem',
            fontFamily: 'Arial',
            color: '#fff',
            textTransform: 'uppercase',
          }}>
            {winner ? '' : "'s Turn"}
          </span>
        )}
        <div style={{ width: 20, height: 2, background: 'linear-gradient(to left, transparent, #ffd700, #fff)', borderRadius: 2 }} />
      </div>

      {/* Controls */}
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
          onClick={handleFullReset}
          className="btn-motion"
          style={{
            width: 130,
            filter: 'brightness(0.85) contrast(1.1)'
          }}
        />
        <img
          src={homeButton}
          alt="Home"
          className="btn-motion"
          style={{
            width: 130,
            filter: 'brightness(0.85) contrast(1.1)'
          }}
          onClick={handleHomeClick}
        />
      </div>
    </div>
  );
};

export default GameBoard;