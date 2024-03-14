// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import Login from './components/Login';
import Signup from './components/Signup';
import DepressionTherapy from './components/DepressionTherapy';
import AnxietyTherapy from './components/AnxietyTherapy';
import StressTherapy from './components/StressTherapy';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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