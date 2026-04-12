/**
 * Mira (Adaptive): Central symmetry and threat response
 */
export const computeMove = (board, moveHistory) => {
  const availableMoves = board
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);

  if (availableMoves.length === 0) return null;

  // 1. Victory check
  const winMove = findWinningMove(board, 'blue');
  if (winMove !== null) return winMove;

  // 2. Defensive check
  const blockMove = findWinningMove(board, 'red');
  if (blockMove !== null) return blockMove;

  // 3. Central symmetry mirroring
  const lastPlayerMove = [...moveHistory].reverse().find(idx => board[idx] === 'red');
  if (lastPlayerMove !== undefined) {
    const mirrorMap = { 0: 8, 1: 7, 2: 6, 3: 5, 4: 4, 5: 3, 6: 2, 7: 1, 8: 0 };
    const mirroredIndex = mirrorMap[lastPlayerMove];

    if (board[mirroredIndex] === null) {
      return mirroredIndex;
    }
  }

  // 4. Fallback: Position priority
  const priority = [4, 0, 2, 6, 8, 1, 3, 5, 7];
  for (let idx of priority) {
    if (board[idx] === null) return idx;
  }

  return availableMoves[0];
};

/**
 * Scan board for immediate line completion
 */
function findWinningMove(board, player) {
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
      if (board[a] === null) return a;
      if (board[b] === null) return b;
      if (board[c] === null) return c;
    }
  }
  return null;
}
