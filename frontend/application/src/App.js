// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DepressionTherapy from "./components/programs/DepressionTherapy";
import AnxietyTherapy from "./components/programs/AnxietyTherapy";
import StressTherapy from "./components/programs/StressTherapy";
import DepressionSymptoms from "./components/programs/DepressionSymptoms";
import AnxietySymptoms from "./components/programs/AnxietySymptoms";
import StressSymptoms from "./components/programs/StressSymptoms";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import "./components/styles/App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "GET",
      });

      if (response.ok) {
        setIsLoggedIn(false);
        setShowLogin(false);
        window.location.href = "/";
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Router>
      <div className="main">
        <Header
          isLoggedIn={isLoggedIn}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          handleLogout={handleLogout}
        />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Home />
                ) : showLogin ? (
                  <Login handleLogin={handleLogin} />
                ) : (
                  <Signup />
                )
              }
            />
            <Route path="/Home" element={<Home />} />
            <Route path="/MainPage" element={<MainPage />} />
            <Route path="/depression-therapy" element={<DepressionTherapy />} />
            <Route path="/anxiety-therapy" element={<AnxietyTherapy />} />
            <Route path="/stress-therapy" element={<StressTherapy />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/depression-symptoms"
              element={<DepressionSymptoms />}
            />
            <Route path="/anxiety-symptoms" element={<AnxietySymptoms />} />
            <Route path="/stress-symptoms" element={<StressSymptoms />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
