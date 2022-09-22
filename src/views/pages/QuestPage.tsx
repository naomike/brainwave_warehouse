import React from 'react';

import { MuseClient } from 'muse-js';
import { useNavigate } from 'react-router-dom';

import backgroundImg from "../../imgs/background.jpeg";
import '../../style/pages/QuestPage.css';
import Header from "../components/Header";
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
    <div className="QuestPage" style={{backgroundImage: `url(${backgroundImg})`}}>
      <Header />
      <div className="quest-container">
        <div className="quest-header">
          0/100
        </div>
        <div className="quest-content">
          Measure your brainwaves while watching an ad <br />
          Reward: 0.03 eth
        </div>
      </div>
      <button className="start-button" onClick={() => {connectMuse(() => navigate('/measurement'))}}>START</button>
    </div>
  );
}

export default QuestPage;
