import React from 'react';
import '../../style/pages/QuestPage.css';

import { MuseClient } from 'muse-js';
import { useNavigate } from 'react-router-dom';
import { startMeasurement } from '../pages/MeasurementPage';

async function connectMuse(callback: VoidFunction) {
  // TODO: try and catch
  window.isMeasuring = true;
  window.source = new MuseClient();
  await window.source.connect();
  await window.source.start();
  window.source.eegReadings$ = window.source.eegReadings;

  startMeasurement();
  callback();
}

function QuestPage() {
  const navigate = useNavigate();

  return (
    <div className="QuestPage">
      <div className="quest-container">
        <div className="quest-header">
          0/100
        </div>
        <div className="quest-content">
          Measure your brainwaves while watching an ad
        </div>
      </div>
      <button className="start-button" onClick={() => {connectMuse(() => navigate('/measurement'))}}>START</button>
    </div>
  );
}

export default QuestPage;
