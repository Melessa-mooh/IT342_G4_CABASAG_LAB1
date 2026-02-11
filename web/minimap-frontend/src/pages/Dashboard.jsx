import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeNav, setActiveNav] = useState('dashboard');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem('user');
    navigate('/');
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-root">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="logo-icon"></div>
          <div className="brand-text">
            <h1>Mini-App</h1>
            <p>by Ma. Melessa Cabasag</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeNav === 'dashboard' ? 'active' : ''}`} 
            onClick={() => setActiveNav('dashboard')}
          >
            <span className="nav-text">Dashboard</span>
          </button>
          <button 
            className={`nav-item ${activeNav === 'profile' ? 'active' : ''}`} 
            onClick={() => setActiveNav('profile')}
          >
            <span className="nav-icon">👤</span>
            <span className="nav-text">Profile</span>
          </button>
        </nav>

        <button className="nav-item logout-btn" onClick={handleLogout}>
          <span className="nav-icon">🚪</span>
          <span className="nav-text">Logout</span>
        </button>
      </aside>

      <main className="dashboard-content">
        {activeNav === 'dashboard' && (
          <div className="welcome-header">
            <h1>Hi {user.firstname}! 👋</h1>
            <p>Welcome to your Mini-App Dashboard</p>
          </div>
        )}
        {activeNav === 'profile' && (
          <div className="profile-section">
            <div className="profile-header">
              <div className="profile-avatar">
                {user.firstname?.charAt(0)}{user.lastname?.charAt(0)}
              </div>
              <div className="profile-title">
                <h1>{user.firstname} {user.lastname}</h1>
                <p>@{user.username}</p>
              </div>
            </div>

            <div className="profile-cards">
              <div className="info-card">
                <h3>Registration Credentials</h3>
                <div className="info-group">
                  <label>First Name</label>
                  <p>{user.firstname || 'Not provided'}</p>
                </div>
                <div className="info-group">
                  <label>Last Name</label>
                  <p>{user.lastname || 'Not provided'}</p>
                </div>
                <div className="info-group">
                  <label>Username</label>
                  <p>@{user.username}</p>
                </div>
                {user.email && (
                  <div className="info-group">
                    <label>Email Address</label>
                    <p>{user.email}</p>
                  </div>
                )}
              </div>

              <div className="info-card">
                <h3>Account Activity</h3>
                <div className="activity-item">
                  <span className="activity-time">Today</span>
                  <span className="activity-text">Account created</span>
                </div>
                <div className="activity-item">
                  <span className="activity-time">Just now</span>
                  <span className="activity-text">Logged in</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
