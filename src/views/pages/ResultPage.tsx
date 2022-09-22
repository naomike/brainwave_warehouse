import '../../style/pages/ResultPage.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from "react-chartjs-2";
import { Link } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ResultPage() {
  const currentTime = new Date()
  const year = String(currentTime.getFullYear());
  const month = String(currentTime.getMonth()).padStart(2, '0');
  const date = String(currentTime.getDate()).padStart(2, '0');
  const hours = String(currentTime.getHours()).padStart(2, '0');
  const minutes = String(currentTime.getMinutes()).padStart(2, '0');
  const currentTimeText = `${month}/${date}/${year} ${hours}:${minutes}`;

  const primaryColor = "#789FFF"
  const secondaryColor = "#FF6D66"
  const tertiaryColor = "#ffa500"
  const quaternaryColor = "#AAAFD9"
  const quinaryColor = "#E29082"

  let graphData;
  graphData = {
    labels: window.brainwave['alpha'],
    datasets: [
      {label: 'alpha', fill: false, data: window.brainwave['alpha'], backgroundColor: primaryColor, borderColor: primaryColor},
      {label: 'beta', data: window.brainwave['beta'], backgroundColor: secondaryColor, borderColor: secondaryColor},
      {label: 'gamma', data: window.brainwave['gamma'], backgroundColor: tertiaryColor, borderColor: tertiaryColor},
      {label: 'delta', data: window.brainwave['delta'], backgroundColor: quaternaryColor, borderColor: quaternaryColor},
      {label: 'theta', data: window.brainwave['theta'], backgroundColor: quinaryColor, borderColor: quinaryColor}
    ]
  };

  const graphOptions = {
    plugins: {
      title: {display: false}
    },
    scales: {
      x: {display: false},
      y: {display: false}
    },
    events: [],
    radius: 0
  };

  return (
    <div className="ResultPage">
      <div className="result__graph_area">
        <Line data={graphData} options={graphOptions} />
      </div>
      <Link to={'/'}>
        <button className="btn-submit">Submit</button>
      </Link>
    </div>
  );
}

export default ResultPage;
