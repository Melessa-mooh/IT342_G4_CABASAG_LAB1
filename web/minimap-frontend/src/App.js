import React, { useState } from 'react';
import './App.css';

function App() {
  const [mode, setMode] = useState('register'); // show Register first as requested
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // form state
  const [register, setRegister] = useState({ firstname: '', lastname: '', username: '', email: '', password: '', confirm: '' });
  const [login, setLogin] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  function validateRegister() {
    const e = {};
    if (!register.firstname.trim()) e.firstname = 'Firstname is required';
    if (!register.lastname.trim()) e.lastname = 'Lastname is required';
    if (!register.username.trim()) e.username = 'Username is required';
    if (register.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (register.password !== register.confirm) e.confirm = 'Passwords do not match';
    return e;
  }

  // live password checks for UI checklist
  const pwChecks = {
    length: register.password.length >= 6,
    number: /\d/.test(register.password),
    uppercase: /[A-Z]/.test(register.password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(register.password),
  };

  function validateLogin() {
    const e = {};
    if (!login.username.trim()) e.username = 'Username is required';
    if (!login.password) e.password = 'Password is required';
    return e;
  }

  function handleRegister() {
    const e = validateRegister();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setCurrentUser({ firstname: register.firstname, lastname: register.lastname, username: register.username, email: register.email });
      setIsLoggedIn(true);
      alert('Registered successfully!');
    }
  }

  function handleLogin() {
    const e = validateLogin();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setCurrentUser({ username: login.username });
      setIsLoggedIn(true);
      alert('Logged in successfully!');
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setMode('login');
    setRegister({ firstname: '', lastname: '', username: '', email: '', password: '', confirm: '' });
    setLogin({ username: '', password: '' });
    setErrors({});
  }

  return (
    <div className="auth-root">
      {isLoggedIn ? (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <>
          <div className="panel left-panel">
            <div className="welcome">
              <h1>MiniMap</h1>
              <p>Sign in or create an account to get started.</p>
              <div className="actions-vertical">
                <button className={`btn ${mode === 'login' ? 'active' : ''}`} onClick={() => { setMode('login'); setErrors({}); }}>
                  Login
                </button>
                <button className={`btn ${mode === 'register' ? 'active' : ''}`} onClick={() => { setMode('register'); setErrors({}); }}>
                  Register
                </button>
              </div>
            </div>
          </div>

          <div className="panel right-panel">
            <div className="auth-box">
              <div className="tab-row">
                <button className={`tab ${mode === 'register' ? 'selected' : ''}`} onClick={() => { setMode('register'); setErrors({}); }}>Register</button>
                <button className={`tab ${mode === 'login' ? 'selected' : ''}`} onClick={() => { setMode('login'); setErrors({}); }}>Login</button>
              </div>

              {mode === 'login' ? (
                <form className="auth-form" onSubmit={(e)=>e.preventDefault()}>
                  <label>Username:</label>
                  <input value={login.username} onChange={e=>setLogin({...login,username:e.target.value})} type="text" name="username" placeholder="Enter username" />
                  {errors.username && <div className="error">{errors.username}</div>}

                  <label>Password:</label>
                  <input value={login.password} onChange={e=>setLogin({...login,password:e.target.value})} type="password" name="password" placeholder="Enter password" />
                  {errors.password && <div className="error">{errors.password}</div>}

                  <button type="button" className="btn primary" onClick={handleLogin}>Login</button>
                </form>
              ) : (
                <form className="auth-form" onSubmit={(e)=>e.preventDefault()}>
                  <label>Firstname:</label>
                  <input value={register.firstname} onChange={e=>setRegister({...register,firstname:e.target.value})} type="text" name="firstname" placeholder="First name" />
                  {errors.firstname && <div className="error">{errors.firstname}</div>}

                  <label>Lastname:</label>
                  <input value={register.lastname} onChange={e=>setRegister({...register,lastname:e.target.value})} type="text" name="lastname" placeholder="Last name" />
                  {errors.lastname && <div className="error">{errors.lastname}</div>}

                  <label>Username:</label>
                  <input value={register.username} onChange={e=>setRegister({...register,username:e.target.value})} type="text" name="username" placeholder="Choose a username" />
                  {errors.username && <div className="error">{errors.username}</div>}

                  <label>Email: (Optional)</label>
                  <input value={register.email} onChange={e=>setRegister({...register,email:e.target.value})} type="email" name="email" placeholder="email@example.com" />

                  <label>Password:</label>
                  <input value={register.password} onChange={e=>setRegister({...register,password:e.target.value})} type="password" name="password" placeholder="Password" />
                  {errors.password && <div className="error">{errors.password}</div>}

                  <label>Confirm Password:</label>
                  <input value={register.confirm} onChange={e=>setRegister({...register,confirm:e.target.value})} type="password" name="confirm" placeholder="Confirm password" />
                  {errors.confirm && <div className="error">{errors.confirm}</div>}

                  <ul className="checklist">
                    <li className={pwChecks.length ? 'ok' : ''}><span className="bullet" />Minimum 6 characters</li>
                    <li className={pwChecks.number ? 'ok' : ''}><span className="bullet" />Contains a number</li>
                    <li className={pwChecks.uppercase ? 'ok' : ''}><span className="bullet" />Contains an uppercase letter</li>
                    <li className={pwChecks.special ? 'ok' : ''}><span className="bullet" />Contains a special character</li>
                  </ul>

                  <button type="button" className="btn primary" onClick={handleRegister}>Register</button>
                </form>
              )}
            </div>
          </div>

          <footer className="footer">A simple minimap-app version by Ma. Melessa Cabasag</footer>
        </>
      )}
    </div>
  );
}

function Dashboard({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <div className="dashboard-root">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="logo-icon">🗺️</div>
          <div className="brand-text">
            <h1>MiniMap</h1>
            <p>App</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeNav === 'dashboard' ? 'active' : ''}`} 
            onClick={() => setActiveNav('dashboard')}
          >
            <span className="nav-icon">📊</span>
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

        <button className="nav-item logout-btn" onClick={onLogout}>
          <span className="nav-icon">🚪</span>
          <span className="nav-text">Logout</span>
        </button>
      </aside>

      <main className="dashboard-content">
        {activeNav === 'dashboard' && (
          <div className="welcome-header">
            <h1>Hi {user.firstname}! 👋</h1>
            <p>Welcome to your MiniMap Dashboard</p>
          </div>
        )}
        {activeNav === 'profile' && (
          <div className="profile-section">
            <div className="profile-header">
              <div className="profile-avatar">{user.firstname?.charAt(0)}{user.lastname?.charAt(0)}</div>
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

export default App;
