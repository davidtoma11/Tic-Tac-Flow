/**
 * Toby (Himself): Flow-aware Minimax with risk modeling
 */
export const computeMove = (board, moveHistory) => {
  const availableMoves = board
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);

  if (availableMoves.length === 0) return null;

  // Modeling human error (5% variance)
  if (Math.random() < 0.05) {
    return getSafeRandomMove(board, availableMoves);
  }

  let bestScore = -Infinity;
  let bestMove = availableMoves[0];

  for (let move of availableMoves) {
    const nextBoard = [...board];
    const nextHistory = [...moveHistory];

    // Simulate piece removal
    if (nextHistory.length === 6) {
      const removedIndex = nextHistory.shift();
      nextBoard[removedIndex] = null;
    }

    nextBoard[move] = 'blue';
    nextHistory.push(move);
    
    const score = flowMinimax(nextBoard, 0, false, nextHistory, -Infinity, Infinity);
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
};

/**
 * Recursive search with alpha-beta pruning and expiration simulation
 */
function flowMinimax(board, depth, isMaximizing, history, alpha, beta) {
  const winner = checkWinner(board);
  if (winner === 'blue') return 10 - depth;
  if (winner === 'red') return depth - 10;
  if (depth === 5) return 0;

  const availableMoves = board
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);

  if (availableMoves.length === 0) return 0;

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let move of availableMoves) {
      const nextBoard = [...board];
      const nextHistory = [...history];

      if (nextHistory.length === 6) {
        const removedIndex = nextHistory.shift();
        nextBoard[removedIndex] = null;
      }

      nextBoard[move] = 'blue';
      nextHistory.push(move);

      const evalScore = flowMinimax(nextBoard, depth + 1, false, nextHistory, alpha, beta);
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let move of availableMoves) {
      const nextBoard = [...board];
      const nextHistory = [...history];

      if (nextHistory.length === 6) {
        const removedIndex = nextHistory.shift();
        nextBoard[removedIndex] = null;
      }

      nextBoard[move] = 'red';
      nextHistory.push(move);

      const evalScore = flowMinimax(nextBoard, depth + 1, true, nextHistory, alpha, beta);
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

/**
 * Heuristic fallback: avoid immediate loss
 */
function getSafeRandomMove(board, availableMoves) {
  for (let move of availableMoves) {
    const testBoard = [...board];
    testBoard[move] = 'red';
    if (checkWinner(testBoard) === 'red') {
      return move; 
    }
  }
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
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
