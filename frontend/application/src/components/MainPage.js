// MainPage.js
import React from "react";
import { Link } from "react-router-dom";
import depressionImage from "../assets/depression_wrap.png";
import anxietyImage from "../assets/anxiety.jpg";
import stressImage from "../assets/stress.jpg";
import "../components/styles/MainPage.css";
import background from "../assets/program_page_title.png";

const MainPage = () => {
  return (
    <div>
      <img className="PageTitle" src={background} alt="Program Page" />
      <h1 className="PageTitle-text">Programs</h1>
      <div className="cards-section">
        <Link to="/depression-therapy" className="therapy-card">
          <img src={depressionImage} alt="Depression Therapy" />
          <h2>Depression Therapy</h2>
        </Link>

        <Link to="/anxiety-therapy" className="therapy-card">
          <img src={anxietyImage} alt="Anxiety Therapy" />
          <h2>Anxiety Therapy</h2>
        </Link>

        <Link to="/stress-therapy" className="therapy-card">
          <img src={stressImage} alt="Stress Therapy" />
          <h2>Stress Therapy</h2>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
