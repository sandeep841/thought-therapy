//TaskContent.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import task_info from "../assets/tasks.json";

const TaskContent = ({ userDetails }) => {
  const { depression_level, anxiety_level, stress_level } = userDetails;
  const [expanded, setExpanded] = useState(false);

  const renderTherapySections = () => {
    if (
      (depression_level !== null && depression_level !== undefined) ||
      (anxiety_level !== null && anxiety_level !== undefined) ||
      (stress_level !== null && stress_level !== undefined)
    ) {
      return (
        <div className="dashboard-container">
          <h1 className="welcome-message">Welcome {userDetails.username}</h1>
          {depression_level !== null && depression_level !== undefined && (
            <section id="depression-section">
              {task_info.map((task) => {
                const { therapy_levels } = task;
                const depressionLevelTasks = therapy_levels.find(
                  (level) => level.therapy_level === depression_level
                );

                if (depressionLevelTasks && task.therapy === "depression") {
                  return (
                    <div key={depressionLevelTasks.therapy_level}>
                      <h2>
                        Depression Therapy- {depressionLevelTasks.therapy_level}
                      </h2>
                      {depressionLevelTasks.tasks.map((task) => (
                        <div
                          className={`task-section`}
                          key={task.task_id}
                          onClick={() => setExpanded(!expanded)}
                        >
                          <span className="task-title">{task.task_title}</span>
                          <TaskDescription
                            taskDescription={task.info[0].task_description}
                            taskIcon={task.info[0].task_icon}
                            expanded={expanded}
                          />
                        </div>
                      ))}
                    </div>
                  );
                } else {
                  return null; // Handle the case where no tasks match the depression level or if therapy is not depression
                }
              })}
            </section>
          )}
          {anxiety_level !== null && anxiety_level !== undefined && (
            <section id="anxiety-section">
              <h2>Anxiety Therapy</h2>
              {task_info
                .filter((task) => task.therapy === "anxiety") // Filter only anxiety tasks
                .map((task) => {
                  const { therapy_levels } = task;
                  const anxietyLevelTasks = therapy_levels.find(
                    (level) => level.therapy_level === anxiety_level
                  );

                  if (anxietyLevelTasks) {
                    return (
                      <div key={anxietyLevelTasks.therapy_level}>
                        <h3>{anxietyLevelTasks.therapy_level}</h3>
                        {anxietyLevelTasks.tasks.map((task) => (
                          <div key={task.task_id}>
                            <span>{task.task_title}</span>
                            <p>{task.info[0].task_description}</p>
                          </div>
                        ))}
                      </div>
                    );
                  } else {
                    return null; // Handle the case where no tasks match the anxiety level
                  }
                })}
            </section>
          )}

          {stress_level !== null && stress_level !== undefined && (
            <section id="stress-section">
              <h2>Stress Therapy</h2>
              {task_info
                .filter((task) => task.therapy === "stress") // Filter only stress tasks
                .map((task) => {
                  const { therapy_levels } = task;
                  const stressLevelTasks = therapy_levels.find(
                    (level) => level.therapy_level === stress_level
                  );

                  if (stressLevelTasks) {
                    return (
                      <div key={stressLevelTasks.therapy_level}>
                        <h3>{stressLevelTasks.therapy_level}</h3>
                        {stressLevelTasks.tasks.map((task) => (
                          <div key={task.task_id}>
                            <span>{task.task_title}</span>
                            <p>{task.info[0].task_description}</p>
                          </div>
                        ))}
                      </div>
                    );
                  } else {
                    return null; // Handle the case where no tasks match the stress level
                  }
                })}
            </section>
          )}
        </div>
      );
    } else {
      return (
        <div className="dashboard-container">
          <h1 className="welcome-message">Welcome {userDetails.username}</h1>
          <div className="no-program-message">
            <h2>No active program!</h2>
            <p>
              Looks like you have not yet taken a program.
              <br />
              You deserve to feel better.
              <br />
              Take a program now.
            </p>
            <Link to="/" className="program-link">
              Take program
            </Link>
          </div>
        </div>
      );
    }
  };

  return renderTherapySections();
};

export default TaskContent;

const TaskDescription = ({ taskDescription, taskIcon, expanded }) => {
  return (
    <div>
      <div className={`task-description ${expanded ? "expanded" : ""}`}>
        {/* <img src={taskIcon} alt="Task Icon" /> */}
        <p>{taskDescription}</p>
      </div>
    </div>
  );
};
