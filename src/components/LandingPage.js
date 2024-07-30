import React from 'react';
import './LandingPage.css';

function LandingPage({ onGetStarted }) {
  return (
    <div className="landing-page">
      <h1>OPTIMIZE YOUR BUSINESS</h1>
      <h2>PROCESS MINING</h2>
      <button className="get-started-btn" onClick={onGetStarted}>Get Started</button>
    </div>
  );
}

export default LandingPage;