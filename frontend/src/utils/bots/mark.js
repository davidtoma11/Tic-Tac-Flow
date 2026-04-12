/**
 * Mark (Master): Optimal move calculation via Minimax
 */
export const computeMove = (board, moveHistory) => {
  const availableMoves = board
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);

  if (availableMoves.length === 0) return null;

  let bestScore = -Infinity;
  let bestMove = availableMoves[0];

  for (let move of availableMoves) {
    const nextBoard = [...board];
    nextBoard[move] = 'blue';
    const score = minimax(nextBoard, 0, false, moveHistory);
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
};

/**
 * Standard recursive search for optimal board outcome
 */
function minimax(board, depth, isMaximizing, history) {
  const winner = checkWinner(board);
  if (winner === 'blue') return 10 - depth;
  if (winner === 'red') return depth - 10;
  if (board.every(v => v !== null) || depth === 4) return 0;

  const availableMoves = board
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let move of availableMoves) {
      const nextBoard = [...board];
      nextBoard[move] = 'blue';
      const score = minimax(nextBoard, depth + 1, false, history);
      maxEval = Math.max(score, maxEval);
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let move of availableMoves) {
      const nextBoard = [...board];
      nextBoard[move] = 'red';
      const score = minimax(nextBoard, depth + 1, true, history);
      minEval = Math.min(score, minEval);
    }
    return minEval;
  }
}

function checkWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
