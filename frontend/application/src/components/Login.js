/* frontend\client\src\components\Login.js */

import React, { useState } from 'react';
import './styles/Login.css';
import FormImg from '../assets/login_page.png';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Login successful');
        // If login is successful, call handleLogin
        handleLogin();
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
        console.error('Login failed:', errorMessage);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='login-page'>
      <div className='form-image'>
        <img src={FormImg} alt="login-page" />
      </div>
    <div className={`login-form ${error ? 'shake' : ''}`}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLoginClick}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </div>
  );
};

export default Login;