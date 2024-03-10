// DepressionTherapy.js
import React, { useState } from 'react';
import depressionQuestions from '../components/DepressionQuestions';

const DepressionTherapy = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState(Array(depressionQuestions.length).fill(''));

  const handleNextQuestion = () => {
    if (currentQuestionIndex < depressionQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionSelect = (option) => {
    const updatedUserResponses = [...userResponses];
    updatedUserResponses[currentQuestionIndex] = option;
    setUserResponses(updatedUserResponses);
  };

  return (
    <div>
      <h1>Depression Therapy - Question {currentQuestionIndex + 1}</h1>
      <p>{depressionQuestions[currentQuestionIndex]}</p>

      {/* Options */}
      <div>
        <label>
          <input
            type="radio"
            value="Did not apply to me at all"
            checked={userResponses[currentQuestionIndex] === 'Did not apply to me at all'}
            onChange={() => handleOptionSelect('Did not apply to me at all')}
          />
          Did not apply to me at all
        </label>
        <label>
          <input
            type="radio"
            value="Applied to me to some degree, or some of the time"
            checked={userResponses[currentQuestionIndex] === 'Applied to me to some degree, or some of the time'}
            onChange={() => handleOptionSelect('Applied to me to some degree, or some of the time')}
          />
          Applied to me to some degree, or some of the time
        </label>
        <label>
          <input
            type="radio"
            value="Applied to me to a considerable degree, or a good part of the time"
            checked={
              userResponses[currentQuestionIndex] === 'Applied to me to a considerable degree, or a good part of the time'
            }
            onChange={() => handleOptionSelect('Applied to me to a considerable degree, or a good part of the time')}
          />
          Applied to me to a considerable degree, or a good part of the time
        </label>
        <label>
          <input
            type="radio"
            value="Applied to me very much, or most of the time"
            checked={userResponses[currentQuestionIndex] === 'Applied to me very much, or most of the time'}
            onChange={() => handleOptionSelect('Applied to me very much, or most of the time')}
          />
          Applied to me very much, or most of the time
        </label>
      </div>

      {/* Navigation buttons */}
      <div>
        <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button onClick={handleNextQuestion} disabled={currentQuestionIndex === depressionQuestions.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DepressionTherapy;
