// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import MainPage from './components/MainPage';
import Login from './components/Login';
import Signup from './components/Signup';
import DepressionTherapy from './components/programs/DepressionTherapy';
import AnxietyTherapy from './components/programs/AnxietyTherapy';
import StressTherapy from './components/programs/StressTherapy';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'GET'
      });

      if (response.ok) {
        setIsLoggedIn(false);
        setShowLogin(false);
        window.location.href = '/';
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };


  return (
    <Router>
      <div>
        <Header
          isLoggedIn={isLoggedIn}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={isLoggedIn ? <MainPage /> : showLogin ? <Login handleLogin={handleLogin} /> : <Signup />} />
          <Route path="/depression-therapy" element={<DepressionTherapy />} />
          <Route path="/anxiety-therapy" element={<AnxietyTherapy />} />
          <Route path="/stress-therapy" element={<StressTherapy />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;