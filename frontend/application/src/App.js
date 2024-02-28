import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import './components/styles/App.css';
import MainPage from './components/MainPage';
import Header from './components/Header';

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
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        handleLogout={handleLogout}
      />
      {!isLoggedIn && (showLogin ? <Login handleLogin={handleLogin} /> : <Signup />)}
      {isLoggedIn && (
        <>
          <MainPage />
        </>
      )}
    </div>
  );
}

export default App;
