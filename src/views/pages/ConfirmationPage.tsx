import React from 'react';

import { useNavigate } from 'react-router-dom';

import backgroundImg from "../../imgs/background.jpeg";
import '../../style/pages/ConfirmationPage.css';
import Header from "../components/Header";

function ConfirmationPage() {
  const navigate = useNavigate();

  return (
    <div className="ConfirmationPage" style={{backgroundImage: `url(${backgroundImg})`}}>
      <Header />
      <div className="confirmation-box">
        What was the product?
        <div className="row-container">
          <input type="radio" value="iPhone" name="answer" /> iPhone
        </div>
        <div className="row-container">
          <input type="radio" value="Android" name="answer" /> Android
        </div>
        <div className="row-container">
          <input type="radio" value="Mac" name="answer" /> Mac
        </div>
        <button className="submit-answer-button" onClick={() => navigate('/result')}>Submit</button>
      </div>
    </div>
  );
}

export default ConfirmationPage;
