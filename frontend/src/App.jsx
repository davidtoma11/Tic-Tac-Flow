import { useState } from 'react';
import Home from './components/Home';
import BotSelection from './components/BotSelection';
import DuelSelection from './components/DuelSelection';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateToBotSelection = () => {
    setCurrentPage('bot-selection');
  };

  const navigateToDuelSelection = () => {
    setCurrentPage('duel-selection');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className="phone-container">
      {currentPage === 'home' && <Home onSoloClick={navigateToBotSelection} onDuelClick={navigateToDuelSelection} />}
      {currentPage === 'bot-selection' && <BotSelection onBackClick={navigateToHome} />}
      {currentPage === 'duel-selection' && <DuelSelection onBackClick={navigateToHome} />}
    </div>
  )
}

export default App
