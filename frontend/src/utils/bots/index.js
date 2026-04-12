import * as Austin from './austin';
import * as Fabio from './fabio';
import * as Mira from './mira';
import * as Anisia from './anisia';
import * as Mark from './mark';
import * as Toby from './toby';

// Strategy registry for AI personalities
const botLogics = {
  'Austin': Austin.computeMove,
  'Fabio': Fabio.computeMove,
  'Mira': Mira.computeMove,
  'Anisia': Anisia.computeMove,
  'Mark': Mark.computeMove,
  'Toby': Toby.computeMove,
};

/**
 * Central decision engine for bot logic
 */
export const getBotDecision = (botName, board, moveHistory) => {
  const computeFunction = botLogics[botName];
  if (computeFunction) {
    return computeFunction(board, moveHistory);
  }
  // Fallback: Default to randomized behavior
  return Austin.computeMove(board, moveHistory);
};
