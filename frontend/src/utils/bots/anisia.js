/**
 * Anisia (Advanced): Defensive blocking with flow-awareness
 */
export const computeMove = (board, moveHistory) => {
  const availableMoves = board
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);

  if (availableMoves.length === 0) return null;

  // Track next exit candidate
  const oldestIndex = moveHistory.length >= 6 ? moveHistory[0] : null;

  // 1. Check win opportunities
  const winMove = findBestMove(board, 'blue', oldestIndex);
  if (winMove !== null) return winMove;

  // 2. Block player threats (conditional on flow expiration)
  const blockMove = findBestMove(board, 'red', oldestIndex);
  if (blockMove !== null) return blockMove;

  // 3. Positional control
  if (board[4] === null) return 4;

  // 4. Trap development
  const corners = [0, 2, 6, 8].filter(idx => board[idx] === null);
  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }

  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

function findBestMove(board, player, oldestIndex) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    const values = [board[a], board[b], board[c]];
    const playerCount = values.filter(v => v === player).length;
    const nullCount = values.filter(v => v === null).length;

    if (playerCount === 2 && nullCount === 1) {
      // Ignore lines destined to break due to flow rules
      const containsOldest = line.includes(oldestIndex);
      
      if (!containsOldest) {
        if (board[a] === null) return a;
        if (board[b] === null) return b;
        if (board[c] === null) return c;
      }
    }
  }
  return null;
}
