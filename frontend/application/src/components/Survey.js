// src/components/Survey.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const questions = [
    "I couldn't seem to experience any positive feeling at all", 
    "I just couldn't seem to get going",
     "I felt that I had nothing to look forward to",
     "I felt sad and depressed",
     "I felt that I had lost interest in just about everything",
     "I felt I wasn't worth much as a person", 
    "I felt that life wasn't worthwhile",
     "I couldn't seem to get any enjoyment out of the things I did", 
    "I felt down-hearted and blue", 
    "I was unable to become enthusiastic about anything", 
    "I felt I was pretty worthless", 
    "I could see nothing in the future to be hopeful about",
     "I felt that life was meaningless", 
    "I found it difficult to work up the initiative to do things "
];

const Survey = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleNext = () => {
    // Save the selected option and move to the next question
    console.log(`Question ${currentQuestion + 1}: ${selectedOption}`);
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption(null);
  };

  const handlePrev = () => {
    // Move to the previous question
    setCurrentQuestion(currentQuestion - 1);
    setSelectedOption(null);
  };

  return (
    <div className="container mt-4">
      <h2>Survey</h2>
      <p>{questions[currentQuestion]}</p>
      <form>
        <div className="form-check">
          <input
            type="radio"
            id="option1"
            value="option1"
            checked={selectedOption === 'option1'}
            onChange={handleOptionChange}
            className="form-check-input"
          />
          <label htmlFor="option1" className="form-check-label">
            Option 1
          </label>
        </div>
        {/* Add similar blocks for other options */}

        <div className="mt-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="btn btn-secondary mr-2"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1 || selectedOption === null}
            className="btn btn-primary"
          >
            {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Survey;
