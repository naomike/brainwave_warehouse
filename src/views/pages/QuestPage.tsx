import React from 'react';
import '../../style/pages/QuestPage.css';

import { MuseClient } from 'muse-js';
import { useNavigate } from 'react-router-dom';

async function connectMuse(callback: VoidFunction) {
  // TODO: try and catch
  window.source = new MuseClient();
  await window.source.connect();
  await window.source.start();
  window.source.eegReadings$ = window.source.eegReadings;

  callback();
}

function QuestPage() {
  const navigate = useNavigate();

  return (
    <div className="QuestPage">
      <div className="quest-content">
        Measure your brainwaves while watching an ad
      </div>
      <button className="start-button" onClick={() => {connectMuse(() => navigate('/'))}}>START</button>
    </div>
  );
}

export default QuestPage;
