import { useState } from 'react';
import { INITIAL_BOARD, getUpdatedBoard } from '../logic/gameLogic';

export const useGameLogic = () => {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [currentPlayer, setCurrentPlayer] = useState('P1');
  const [turnCounter, setTurnCounter] = useState(0);

  const makeMove = (position) => {
    // Logic to update board and player
    const nextBoard = getUpdatedBoard(board, position, currentPlayer, turnCounter);
    setBoard(nextBoard);
    setCurrentPlayer(currentPlayer === 'P1' ? 'P2' : 'P1');
    setTurnCounter(prev => prev + 1);
  };

  return { board, currentPlayer, makeMove };
};
