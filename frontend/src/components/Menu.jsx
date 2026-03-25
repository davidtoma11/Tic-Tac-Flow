import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';
import soloModeCard from '../assets/soloModeCard.png';
import duelModeCard from '../assets/duelModeCard.png';
import tmainTitle from '../assets/tmainTitle.png';
import firstPageBG from '../assets/firstPageBG.png';
import secondPageBG from '../assets/secondPageBG.png';
import backButton from '../assets/backButton.png';
import botAnisia from '../assets/bots/botCardAnisia.png';
import botAustin from '../assets/bots/botCardAustin.png';
import botFabio from '../assets/bots/botCardFabio.png';
import botMark from '../assets/bots/botCardMark.png';
import botMira from '../assets/bots/botCardMira.png';
import botToby from '../assets/bots/botCardToby.png';

const bots = [
  { name: 'Anisia', image: botAnisia },
  { name: 'Austin', image: botAustin },
  { name: 'Fabio', image: botFabio },
  { name: 'Mark', image: botMark },
  { name: 'Mira', image: botMira },
  { name: 'Toby', image: botToby },
];

function Menu() {
  const [showSoloPage, setShowSoloPage] = useState(false);
  const [showDuelPage, setShowDuelPage] = useState(false);

  return (
    <div 
      className="menu" 
      style={{ backgroundImage: `url(${showSoloPage || showDuelPage ? secondPageBG : firstPageBG})` }}
    >
      <img src={tmainTitle} alt="Tic-Tac-Flow Title" className="main-title" />

      {!showSoloPage && !showDuelPage && (
        <div className="cards-container">
          <button className="game-card" onClick={() => setShowSoloPage(true)}>
            <img src={soloModeCard} alt="Solo Mode" />
          </button>
          <button className="game-card" onClick={() => setShowDuelPage(true)}>
            <img src={duelModeCard} alt="Duel Mode" />
          </button>
        </div>
      )}

      {showSoloPage && (
        <div className="solo-page">
          <div className="bots-grid">
            {bots.map((bot) => (
              <Link to="/game" key={bot.name} className="bot-card">
                <img src={bot.image} alt={bot.name} />
              </Link>
            ))}
          </div>
          <button className="back-button" onClick={() => setShowSoloPage(false)}>
            <img src={backButton} alt="Back" />
          </button>
        </div>
      )}

      {showDuelPage && (
        <div className="duel-page">
          <button className="back-button" onClick={() => setShowDuelPage(false)}>
            <img src={backButton} alt="Back" />
          </button>
          <h2>Duel Mode</h2>
          <p>Coming soon...</p>
        </div>
      )}
    </div>
  );
}

export default Menu;
