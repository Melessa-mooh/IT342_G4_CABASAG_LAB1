import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirm: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const pwChecks = {
    length: formData.password.length >= 8,
    number: /\d/.test(formData.password),
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
  };

  function validateInput() {
    const e = {};
    if (!formData.firstname.trim()) e.firstname = 'Firstname is required';
    if (!formData.lastname.trim()) e.lastname = 'Lastname is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    if (formData.password.length < 8) e.password = 'Password must be at least 8 characters with uppercase, lowercase, and a number';
    if (!pwChecks.uppercase || !pwChecks.lowercase || !pwChecks.number) e.password = 'Password must contain uppercase, lowercase, and a number';
    if (formData.password !== formData.confirm) e.confirm = 'Passwords do not match';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateInput();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        console.log('Sending registration request...');
        const data = await registerUser(
          formData.firstname,
          formData.lastname,
          formData.username,
          formData.email,
          formData.password,
          formData.confirm
        );
        
        console.log('Registration response:', data);
        
        // Check if response has error
        if (data.error) {
          console.log('Registration error:', data.error);
          setErrors({ form: data.error });
        } else if (data.user) {
          // Success - user data exists
          console.log('Registration successful, user:', data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/dashboard');
        } else {
          // Unexpected response format
          console.log('Unexpected response format:', data);
          setErrors({ form: 'Registration successful but unexpected response format. Please try logging in.' });
        }
      } catch (error) {
        console.error('Registration error:', error);
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
          <p>Create an account to get started.</p>
          <div className="actions-vertical">
            <button className="btn" onClick={() => navigate('/login')}>Login</button>
            <button className="btn active">Register</button>
          </div>
        </div>
      </div>

      <div className="panel right-panel">
        <div className="auth-box">
          <div className="tab-row">
            <button className="tab selected">Register</button>
            <button className="tab" onClick={() => navigate('/login')}>Login</button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {errors.form && <div className="error" style={{marginBottom:'12px'}}>{errors.form}</div>}
            
            <label>Firstname:</label>
            <input 
              disabled={isLoading} 
              value={formData.firstname} 
              onChange={e => setFormData({...formData, firstname: e.target.value})} 
              type="text" 
              placeholder="First name" 
            />
            {errors.firstname && <div className="error">{errors.firstname}</div>}

            <label>Lastname:</label>
            <input 
              disabled={isLoading} 
              value={formData.lastname} 
              onChange={e => setFormData({...formData, lastname: e.target.value})} 
              type="text" 
              placeholder="Last name" 
            />
            {errors.lastname && <div className="error">{errors.lastname}</div>}

            <label>Email:</label>
            <input 
              disabled={isLoading} 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
              type="email" 
              placeholder="email@example.com" 
            />
            {errors.email && <div className="error">{errors.email}</div>}

            <label>Username: (Optional)</label>
            <input 
              disabled={isLoading} 
              value={formData.username} 
              onChange={e => setFormData({...formData, username: e.target.value})} 
              type="text" 
              placeholder="Choose a username" 
            />

            <label>Password:</label>
            <input 
              disabled={isLoading} 
              value={formData.password} 
              onChange={e => setFormData({...formData, password: e.target.value})} 
              type="password" 
              placeholder="Password" 
            />
            {errors.password && <div className="error">{errors.password}</div>}

            <label>Confirm Password:</label>
            <input 
              disabled={isLoading} 
              value={formData.confirm} 
              onChange={e => setFormData({...formData, confirm: e.target.value})} 
              type="password" 
              placeholder="Confirm password" 
            />
            {errors.confirm && <div className="error">{errors.confirm}</div>}

            <ul className="checklist">
              <li className={pwChecks.length ? 'ok' : ''}><span className="bullet" />Minimum 8 characters</li>
              <li className={pwChecks.uppercase ? 'ok' : ''}><span className="bullet" />Contains an uppercase letter</li>
              <li className={pwChecks.lowercase ? 'ok' : ''}><span className="bullet" />Contains a lowercase letter</li>
              <li className={pwChecks.number ? 'ok' : ''}><span className="bullet" />Contains a number</li>
            </ul>

            <button type="submit" className="btn primary" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </button>
            
            <p style={{textAlign: 'center', marginTop: '16px'}}>
              Already have an account? <span style={{color: '#FFD700', cursor: 'pointer'}} onClick={() => navigate('/login')}>Login</span>
            </p>
          </form>
        </div>
      </div>

      <footer className="footer">A simple minimap-app version by Ma. Melessa Cabasag</footer>
    </div>
  );
}

export default Register;
