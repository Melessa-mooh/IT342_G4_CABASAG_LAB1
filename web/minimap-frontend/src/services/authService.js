const API_BASE_URL = 'http://localhost:8080/api';

export async function loginUser(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    
    const data = await response.json();
    
    
    if (!response.ok) {
      return { error: data.error || data.message || 'Login failed' };
    }
    
    return data;
  } catch (error) {
    console.error('Login API error:', error);
    return { error: 'Network error. Please check if backend is running.' };
  }
}

export async function registerUser(firstname, lastname, username, email, password, confirmPassword) {
  try {
    console.log('Calling register API with:', { firstname, lastname, username, email });
    
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname,
        lastname,
        username,
        email,
        password,
        confirmPassword,
      }),
    });
    
    console.log('Register API response status:', response.status, response.statusText);
    
    const data = await response.json();
    console.log('Register API response data:', data);
    
    if (!response.ok) {
      return { error: data.error || data.message || `Registration failed (${response.status})` };
    }
    
    return data;
  } catch (error) {
    console.error('Register API error:', error);
    return { error: `Network error: ${error.message}. Please check if backend is running.` };
  }
}
