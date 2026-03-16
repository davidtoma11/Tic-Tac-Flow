export const INITIAL_BOARD = Array(9).fill(null);

export const PLAYER_1 = 'P1';
export const PLAYER_2 = 'P2';

// State: Array(9) of { player: 'P1' | 'P2', timestamp: number } | null

export const getUpdatedBoard = (board, position, player, turnCounter) => {
  const newBoard = [...board];
  
  // 1. If occupied, ignore
  if (newBoard[position]) return board;
  
  // 2. Remove oldest if player has 3 pieces
  const playerPieces = newBoard.filter(p => p && p.player === player);
  if (playerPieces.length >= 3) {
    // Find index of oldest piece (min timestamp)
    let oldestTimestamp = Infinity;
    let oldestIndex = -1;
    newBoard.forEach((p, idx) => {
      if (p && p.player === player && p.timestamp < oldestTimestamp) {
        oldestTimestamp = p.timestamp;
        oldestIndex = idx;
      }
    });
    if (oldestIndex !== -1) newBoard[oldestIndex] = null;
  }
  
  // 3. Add new piece
  newBoard[position] = { player, timestamp: turnCounter };
  
  return newBoard;
};
