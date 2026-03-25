import React from 'react';
import '../styles/Home.css';
import duelModeCard from '../assets/duelModeCard.png';
import soloModeCard from '../assets/soloModeCard.png';
import tmainTitle from '../assets/tmainTitle.png';
import firstPageBG from '../assets/firstPageBG.png';

const Home = () => {
  return (
    <div className="first-page">
      <img src={firstPageBG} alt="Background" className="background-image" />
      <img src={tmainTitle} alt="Tic-Tac-Flow" className="game-title" />
      <img src={soloModeCard} alt="Solo Mode" className="solo-mode-card" />
      <img src={duelModeCard} alt="Duel Mode" className="duel-mode-card" />
    </div>
  );
};

export default Home;
