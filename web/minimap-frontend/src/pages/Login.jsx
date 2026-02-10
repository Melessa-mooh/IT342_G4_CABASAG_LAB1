import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function validateInput() {
    const e = {};
    if (!formData.username.trim()) e.username = 'Username or Email is required';
    if (!formData.password) e.password = 'Password is required';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateInput();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const data = await loginUser(formData.username, formData.password);
        
        // Check if response has error
        if (data.error) {
          setErrors({ form: data.error });
        } else if (data.user) {
          // Success - user data exists
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/dashboard');
        } else {
          // Unexpected response format
          setErrors({ form: 'Login successful but unexpected response format. Please try again.' });
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ form: `Error: ${error.message || 'Network error. Please try again.'}` });
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="auth-root">
      <div className="panel left-panel">
        <div className="welcome">
          <h1>MiniMap</h1>
          <p>Sign in to your account.</p>
          <div className="actions-vertical">
            <button className="btn active">Login</button>
            <button className="btn" onClick={() => navigate('/register')}>Register</button>
          </div>
        </div>
      </div>

      <div className="panel right-panel">
        <div className="auth-box">
          <div className="tab-row">
            <button className="tab selected">Login</button>
            <button className="tab" onClick={() => navigate('/register')}>Register</button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {errors.form && <div className="error" style={{marginBottom:'12px'}}>{errors.form}</div>}
            
            <label>Username or Email:</label>
            <input 
              disabled={isLoading} 
              value={formData.username} 
              onChange={e => setFormData({...formData, username: e.target.value})} 
              type="text" 
              name="username" 
              placeholder="Enter username or email" 
            />
            {errors.username && <div className="error">{errors.username}</div>}

            <label>Password:</label>
            <input 
              disabled={isLoading} 
              value={formData.password} 
              onChange={e => setFormData({...formData, password: e.target.value})} 
              type="password" 
              name="password" 
              placeholder="Enter password" 
            />
            {errors.password && <div className="error">{errors.password}</div>}

            <button type="submit" className="btn primary" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            
            <p style={{textAlign: 'center', marginTop: '16px'}}>
              Don't have an account? <span style={{color: '#FFD700', cursor: 'pointer'}} onClick={() => navigate('/register')}>Register</span>
            </p>
          </form>
        </div>
      </div>

      <footer className="footer">A simple minimap-app version by Ma. Melessa Cabasag</footer>
    </div>
  );
}

export default Login;
