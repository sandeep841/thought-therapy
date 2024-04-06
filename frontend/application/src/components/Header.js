import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/Header.css";

const Header = ({ isLoggedIn, showLogin, setShowLogin, handleLogout }) => {
  const location = useLocation();

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleSignupClick = () => {
    setShowLogin(false);
  };

  const handleLogoutClick = () => {
    handleLogout(); // Call the handleLogout function passed from App.js
  };

  return (
    <div className="header">
      <div className="menu-items">
        <h2 className="title">
          <Link to="/" className="h-btn">
            Thought Therapy
          </Link>
        </h2>

        {isLoggedIn && (
          <nav className="navigate">
            <Link
              to="/dashboard"
              className={`menu-button ${
                location.pathname === "/dashboard" ? "active" : ""
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/"
              className={`menu-button ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Programs
            </Link>
          </nav>
        )}
      </div>
      {isLoggedIn ? (
        // Render logout button if user is logged in
        <button className="logout-button" onClick={handleLogoutClick}>
          Logout
        </button>
      ) : (
        // Render login/signup buttons if user is not logged in
        <div className="login-signup">
          <button
            className={`h-button ${showLogin ? "active" : ""}`}
            onClick={handleLoginClick}
          >
            <Link to="/" className="h-btn">
              Login
            </Link>
          </button>
          <button
            className={`h-button ${showLogin ? "" : "active"}`}
            onClick={handleSignupClick}
          >
            <Link to="/" className="h-btn">
              Signup
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
