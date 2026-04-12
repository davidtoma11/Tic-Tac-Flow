/**
 * Fabio (Inedit): Pattern-based aesthetic moves
 */
export const computeMove = (board) => {
  const availableMoves = board
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);

  if (availableMoves.length === 0) return null;

  // Preference weights for geometric symmetry
  const preferences = {
    4: 10, // Center
    0: 8, 2: 8, 6: 8, 8: 8, // Corners
    1: 2, 3: 2, 5: 2, 7: 2  // Edges
  };

  const moveScores = availableMoves.map(idx => ({
    index: idx,
    score: preferences[idx] + (Math.random() * 2)
  }));

  moveScores.sort((a, b) => b.score - a.score);
  return moveScores[0].index;
};
