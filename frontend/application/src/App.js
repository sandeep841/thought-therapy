import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import MainPage from './components/MainPage';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <MainPage />
              ) : showLogin ? (
                <Login handleLogin={handleLogin} />
              ) : (
                <Signup />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
