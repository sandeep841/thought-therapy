import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';

const Header = ({ isLoggedIn, showLogin, setShowLogin, handleLogout }) => {
  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleSignupClick = () => {
    setShowLogin(false);
  };

  return (
    <div className="header">
      <h2 className="title">
      <Link to="/" className='h-btn'>Thought Therapy</Link>
      </h2>
      {isLoggedIn ? (
        // Render logout button if user is logged in
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        // Render login/signup buttons if user is not logged in
        <div>
          <button
            className={`h-button ${showLogin ? 'active' : ''}`}
            onClick={handleLoginClick}
          >
            <Link to="/" className='h-btn'>Login</Link>
          </button>
          <button
            className={`h-button ${showLogin ? '' : 'active'}`}
            onClick={handleSignupClick}
          >
            <Link to="/" className='h-btn'>Signup</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
