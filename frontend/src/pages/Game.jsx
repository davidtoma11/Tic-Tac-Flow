import React from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import Board from '../components/Board';
import '../styles/Home.css'; // Let's use some shared styles for now or create Game.css

const Game = () => {
  const { board, currentPlayer, makeMove } = useGameLogic();

  return (
    <div className="home-container">
      <div className="game-status">
        <h2>Current Player: {currentPlayer}</h2>
      </div>
      <Board board={board} onCellClick={makeMove} />
      <div className="game-footer">
        <button onClick={() => window.location.href = '/'} className="back-link">
          Quit Game
        </button>
      </div>
    </div>
  );
};

export default Game;
