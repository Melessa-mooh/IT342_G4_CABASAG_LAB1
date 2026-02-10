import React from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="auth-root">
      <div className="panel left-panel">
        <div className="welcome">
          <h1>MiniMap</h1>
          <p>Sign in or create an account to get started.</p>
          <div className="actions-vertical">
            <button className="btn" onClick={() => navigate('/register')}>
              GetStarted
            </button>
          </div>
        </div>
      </div>
      <footer className="footer">A simple minimap-app version by Ma. Melessa Cabasag</footer>
    </div>
  );
}

export default Welcome;
