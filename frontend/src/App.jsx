import { useState } from 'react';
import Home from './components/Home';
import BotSelection from './components/BotSelection';
import DuelSelection from './components/DuelSelection';
import GameBoard from './components/GameBoard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [gameMode, setGameMode] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [scores, setScores] = useState({ red: 0, blue: 0 });

  const navigateToBotSelection = () => {
    setCurrentPage('bot-selection');
  };

  const navigateToDuelSelection = () => {
    setCurrentPage('duel-selection');
  };

  const navigateToGameBoard = (mode) => {
    setGameMode(mode);
    setCurrentPlayer('red');
    setCurrentPage('game-board');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  const handleScoreUpdate = (winner) => {
    setScores(prev => ({
      ...prev,
      [winner]: prev[winner] + 1
    }));
  };

  const handleScoreReset = () => {
    setScores({ red: 0, blue: 0 });
  };

  return (
    <div className="phone-container">
      {currentPage === 'home' && <Home onSoloClick={navigateToBotSelection} onDuelClick={navigateToDuelSelection} />}
      {currentPage === 'bot-selection' && <BotSelection onBackClick={navigateToHome} onPlayClick={() => navigateToGameBoard('Solo')} />}
      {currentPage === 'duel-selection' && <DuelSelection onBackClick={navigateToHome} onPlayClick={() => navigateToGameBoard('Local')} />}
      {currentPage === 'game-board' && (
        <GameBoard 
          mode={gameMode} 
          onHomeClick={navigateToHome} 
          currentPlayer={currentPlayer}
          scores={scores}
          onScoreUpdate={handleScoreUpdate}
          gameStatus={{ onReset: handleScoreReset }}
        />
      )}
    </div>
  )
}

export default App;