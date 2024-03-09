// frontend\client\src\components\Signup.js

import './styles/Signup.css';
import React, { useState } from 'react';
import FormImg from '../assets/login_page.png';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignupClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, dob, password, confirmPassword }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setSuccessMessage(responseData.message);
        // Optionally, you can reset the form fields here if needed
        setUsername('');
        setEmail('');
        setDob('');
        setPassword('');
        setConfirmPassword('');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
        console.error('Signup failed:', errorMessage);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className='signup-page'>
    <div className='form-image'>
        <img src={FormImg} alt="login-page" />
      </div>
    <div className='signup-form'>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="DD/MM/YYYY"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleSignupClick}>Signup</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
    </div> 
  );
};

export default Signup;
