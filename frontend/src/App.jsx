import { useState } from 'react';
import Home from './components/Home';
import BotSelection from './components/BotSelection';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateToBotSelection = () => {
    setCurrentPage('bot-selection');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className="phone-container">
      {currentPage === 'home' && <Home onSoloClick={navigateToBotSelection} />}
      {currentPage === 'bot-selection' && <BotSelection onBackClick={navigateToHome} />}
    </div>
  )
}

export default App
