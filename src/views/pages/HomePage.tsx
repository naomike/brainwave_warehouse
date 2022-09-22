import React from 'react';
import '../../style/pages/HomePage.css';

import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="HomePage">
      <div className="quest-board">
        <div className="quest-board-header">Quests</div>
        <button className="quest">
          <Link to={'/quest'}>quest 1</Link>
        </button>
        <button className="quest">quest 2</button>
        <button className="quest">quest 3</button>
        <button className="quest">quest 4</button>
        <button className="quest">quest 5</button>
      </div>
    </div>
  );
}

export default HomePage;
