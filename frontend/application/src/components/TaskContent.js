import React from "react";

const TaskContent = ({ userDetails }) => {
  const { depression_level, anxiety_level, stress_level } = userDetails;

  const renderTherapySections = () => {
    if (
      depression_level !== null &&
      depression_level !== undefined &&
      anxiety_level !== null &&
      anxiety_level !== undefined &&
      stress_level !== null &&
      stress_level !== undefined
    ) {
      return (
        <div className="dashboard-container">
          <h1 className="welcome-message">Welcome {userDetails.username}</h1>
          <section id="depression-section">
            <h2>Depression Therapy</h2>
            <span className="task-title">task-1</span>
            <span className="task-title">task-2</span>
            <span className="task-title">task-3</span>
            <span className="task-title">task-4</span>
            <span className="task-title">task-5</span>
            <span className="task-title">task-6</span>
          </section>
          <section id="anxiety-section">
            <h2>Anxiety Therapy</h2>
            <span className="task-title">task-1</span>
            <span className="task-title">task-2</span>
            <span className="task-title">task-3</span>
            <span className="task-title">task-4</span>
            <span className="task-title">task-5</span>
            <span className="task-title">task-6</span>
          </section>
          <section id="stress-section">
            <h2>Stress Therapy</h2>
            <span className="task-title">task-1</span>
            <span className="task-title">task-2</span>
            <span className="task-title">task-3</span>
            <span className="task-title">task-4</span>
            <span className="task-title">task-5</span>
            <span className="task-title">task-6</span>
          </section>
        </div>
      );
    } else {
      return (
        <div className="dashboard-container">
          <h1 className="welcome-message">Welcome {userDetails.username}</h1>
          <p className="no-program-message">
            Looks like you have not yet taken a program.
            <br />
            You deserve to feel better. Take a program now.
          </p>
        </div>
      );
    }
  };

  return renderTherapySections();
};

export default TaskContent;
