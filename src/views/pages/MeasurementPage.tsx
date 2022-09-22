import { useState, useEffect } from 'react';
import '../../style/pages/MeasurementPage.css';

import { takeWhile } from 'rxjs/operators';
import { bandpassFilter, epoch, fft, powerByBand } from '@neurosity/pipes'
import { zipSamples } from 'muse-js';
import { useNavigate } from 'react-router-dom';
import { Brainwaves } from '../../types/brainwaves';

function buildPipe() {
  window.pipeBands$ = zipSamples(window.source.eegReadings$).pipe(
    bandpassFilter({
      cutoffFrequencies: [2, 50]
    }),
    epoch({
      duration: 1024,
      interval: 100,
      samplingRate: 256
    }),
    fft({bins: 256}),
    powerByBand()
  );
}

export function startMeasurement() {
  window.brainwave = {alpha: [], beta: [], gamma: [], delta: [], theta: []};
  buildPipe()
  window.subscriptionBands = window.pipeBands$.pipe(
    takeWhile(() => window.isMeasuring === true)
  );

  window.subscriptionBands.subscribe({
    next(x: Brainwaves) {
      const brainwaveScoreSum = {alpha: 0, beta: 0, gamma: 0, delta: 0, theta: 0};
      // TODO: refactor (redundant code)
      // Sum up 4 channels
      x['alpha'].forEach((score: number) => {
        brainwaveScoreSum['alpha'] += score;
      })
      x['beta'].forEach((score: number) => {
        brainwaveScoreSum['beta'] += score;
      })
      x['gamma'].forEach((score: number) => {
        brainwaveScoreSum['gamma'] += score;
      })
      x['delta'].forEach((score: number) => {
        brainwaveScoreSum['delta'] += score;
      })
      x['theta'].forEach((score: number) => {
        brainwaveScoreSum['theta'] += score;
      })
      const scoreSum = brainwaveScoreSum['alpha'] + brainwaveScoreSum['beta'] +
        brainwaveScoreSum['gamma'] + brainwaveScoreSum['delta'] + brainwaveScoreSum['theta']
      window.brainwave['alpha'].push(brainwaveScoreSum['alpha'] / scoreSum);
      window.brainwave['beta'].push(brainwaveScoreSum['beta'] / scoreSum);
      window.brainwave['gamma'].push(brainwaveScoreSum['gamma'] / scoreSum);
      window.brainwave['delta'].push(brainwaveScoreSum['delta'] / scoreSum);
      window.brainwave['theta'].push(brainwaveScoreSum['theta'] / scoreSum);
    },
    error(error: Error) { console.log(error); },
    complete() {}
  })
}


function MeasurementPage() {
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(10);
  useEffect(() => {
    if (remainingTime > 0) {
      const interval = setInterval(
        () => {setRemainingTime(remainingTime - 1)}, 1000
      );
      return () => clearInterval(interval);
    }
  }, [remainingTime])

  const stopMeasurement = () => {
    if (!window.brainwave['alpha'] || window.brainwave['alpha'].length <= 1) {
      // forbid stopping until at least two scores
      return
    }
    window.isMeasuring = false;
    navigate('/result')
  }

  if (remainingTime > 0) {
    return (
      <div className="MeasurementPage">
        <div className="timer">
          <div className="remaining-timer-text">REMAINING TIME</div>
          <div className="remaining-timer-num">
            { Math.floor(remainingTime / 60) }:{ String(remainingTime % 60).padStart(2, '0') }
          </div>
        </div>
      </div>
    );
  } else {
    stopMeasurement();
    return <></>
  }
}

export default MeasurementPage;
