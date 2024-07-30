import React from 'react';
import './LandingPage.css';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure this path is correct

function LandingPage({ onSignIn }) {
  const handleGetStarted = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      onSignIn(result.user);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  return (
    <div className="landing-page">
      <h1>OPTIMIZE YOUR BUSINESS</h1>
      <h2>PROCESS MINING</h2>
      <button className="get-started-btn" onClick={handleGetStarted}>Get Started</button>
    </div>
  );
}

export default LandingPage;