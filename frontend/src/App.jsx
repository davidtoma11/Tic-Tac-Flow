import { useState } from 'react';
import Home from './components/Home';
import BotSelection from './components/BotSelection';
import DuelSelection from './components/DuelSelection';
import DiscSelection from './components/DiscSelection';
import GameBoard from './components/GameBoard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [gameMode, setGameMode] = useState('');
  const [selectedBot, setSelectedBot] = useState(null);
  const [scores, setScores] = useState({ red: 0, blue: 0 });
  const [playerDiscs, setPlayerDiscs] = useState({ p1: null, p2: null });

  const navigateToBotSelection = () => {
    setCurrentPage('bot-selection');
  };

  const navigateToDuelSelection = () => {
    setCurrentPage('duel-selection');
  };

  const navigateToDiscSelection = () => {
    setCurrentPage('disc-selection');
  };

  const navigateToGameBoard = (mode, discs = null, bot = null) => {
    setGameMode(mode);
    setSelectedBot(bot);
    if (discs) {
      setPlayerDiscs(discs);
    }
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

  const handleDiscSelectionComplete = (p1Disc, p2Disc) => {
    navigateToGameBoard('Local', { p1: p1Disc.img, p2: p2Disc.img });
  };

  return (
    <div className="phone-container">
      {currentPage === 'home' && <Home onSoloClick={navigateToBotSelection} onDuelClick={navigateToDuelSelection} />}
      
      {currentPage === 'bot-selection' && (
        <BotSelection 
          onBackClick={navigateToHome} 
          onPlayClick={() => {
            console.log("Solo mode is coming soon!");
          }} 
        />
      )}

      {currentPage === 'duel-selection' && (
        <DuelSelection 
          onBackClick={navigateToHome} 
          onPlayClick={(modeName) => {
            if (modeName === 'Local') {
              navigateToDiscSelection();
            } else {
              console.log("Online mode is coming soon!");
            }
          }} 
        />
      )}

      {currentPage === 'disc-selection' && (
        <DiscSelection 
          onBackClick={navigateToDuelSelection}
          onSelectionComplete={handleDiscSelectionComplete}
        />
      )}

      {currentPage === 'game-board' && (
        <GameBoard 
          mode={gameMode} 
          onHomeClick={navigateToHome} 
          scores={scores}
          onScoreUpdate={handleScoreUpdate}
          selectedBot={selectedBot}
          onScoreReset={handleScoreReset}
          customDiscs={playerDiscs}
        />
      )}
    </div>
  )
}

export default App;