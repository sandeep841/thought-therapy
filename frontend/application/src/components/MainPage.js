import React from 'react';
import depressionImage from '../assets/depression_wrap.png';
import anxietyImage from '../assets/anxiety.jpg';
import stressImage from '../assets/stress.jpg';
import '../components/styles/MainPage.css';

const MainPage = ({ handleLogout }) => {
  return (
   <div>

    <h1 className='PageTitle'>Programs</h1>
    <div className='cards-section'>     
      <div className="therapy-card">
        <img src={depressionImage} alt="Depression Therapy" />
        <h2>Depression Therapy</h2>
      </div>

      <div className="therapy-card">
        <img src={anxietyImage} alt="Anxiety Therapy" />
        <h2>Anxiety Therapy</h2>
      </div>

      <div className="therapy-card">
        <img src={stressImage} alt="Stress Therapy" />
        <h2>Stress Therapy</h2>
      </div>
    </div>
   </div>
  );
};

export default MainPage;
