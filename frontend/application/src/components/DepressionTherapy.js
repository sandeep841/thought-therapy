import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import depressionQuestions from '../components/DepressionQuestions';

const DepressionTherapy = () => {
  // eslint-disable-next-line
  const navigate = useNavigate();
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

  const allQuestionsAnswered = userResponses.every((response) => response !== '');

  const handleSubmit = () => {
    const featureKeys = [
      'Q2A', 'Q4A', 'Q7A', 'Q9A', 'Q15A', 'Q19A', 'Q20A', 'Q23A', 'Q25A', 'Q28A', 'Q30A', 'Q36A', 'Q40A', 'Q41A'
    ];

    const requestData = {};
    featureKeys.forEach((key, index) => {
      requestData[`${key}`] = [parseInt(userResponses[index])];
    });

    // Assume you have a backend URL for prediction, replace it with your actual URL
    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Prediction result:', data);
        // Optionally, you can redirect the user to the home page here
        navigate('/');
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Depression Therapy </h1>
      <div className="options-index">
        <p className="option-desc">
          0 = Did not apply to me at all.<br />
          1 = Applied to me to some degree, or some of the time.<br />
          2 = Applied to me to a considerable degree, or a good part of the time.<br />
          3 = Applied to me very much, or most of the time.
        </p>
      </div>

      <p>
        Question {currentQuestionIndex + 1}:<br />
        &nbsp;&nbsp;&nbsp;{depressionQuestions[currentQuestionIndex]}
      </p>

      {/* Options */}
      <div>
      <label>
          <input
            type="radio"
            value="0"
            checked={userResponses[currentQuestionIndex] === '0'}
            onChange={() => handleOptionSelect('0')}
          />
          0
        </label>
        <label>
          <input
            type="radio"
            value="1"
            checked={userResponses[currentQuestionIndex] === '1'}
            onChange={() => handleOptionSelect('1')}
          />
          1
        </label>
        <label>
          <input
            type="radio"
            value="2"
            checked={
              userResponses[currentQuestionIndex] === '2'
            }
            onChange={() => handleOptionSelect('2')}
          />
          2
        </label>
        <label>
          <input
            type="radio"
            value="3"
            checked={userResponses[currentQuestionIndex] === '3'}
            onChange={() => handleOptionSelect('3')}
          />
          3
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

      {/* Submit button */}
      <div>
        <button onClick={handleSubmit} disabled={!allQuestionsAnswered}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default DepressionTherapy;
