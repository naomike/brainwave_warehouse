import React from 'react';

import { useNavigate } from 'react-router-dom';

import backgroundImg from "../../imgs/background.jpeg";
import '../../style/pages/HomePage.css';
import Header from "../components/Header";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="HomePage" style={{backgroundImage: `url(${backgroundImg})`}}>
      <Header />
      <div className="quest-board">
        <div className="quest-board-header">Quests</div>
        <button className="quest" onClick={() => navigate('/quest')}>quest 1</button>
        <button className="quest" onClick={() => navigate('/quest')}>quest 2</button>
        <button className="quest" onClick={() => navigate('/quest')}>quest 3</button>
        <button className="quest" onClick={() => navigate('/quest')}>quest 4</button>
        <button className="quest" onClick={() => navigate('/quest')}>quest 5</button>
        <button className="create-quest-button">Create Quest</button>
      </div>
    </div>
  );
}

export default HomePage;
