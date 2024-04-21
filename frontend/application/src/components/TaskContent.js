//TaskContent.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import task_info from "../assets/tasks.json";
import axios from "axios";

const TaskContent = ({ userDetails }) => {
  const { depression_level, anxiety_level, stress_level } = userDetails;
  const [expandedTasks, setExpandedTasks] = useState({});
  const [depressionTasks, setDepressionTasks] = useState({});
  const [anxietyTasks, setAnxietyTasks] = useState({});
  const [stressTasks, setStressTasks] = useState({});

  useEffect(() => {
    if (userDetails && userDetails.depression_tasks) {
      setDepressionTasks(userDetails.depression_tasks);
    }
    if (userDetails && userDetails.anxiety_tasks) {
      setAnxietyTasks(userDetails.anxiety_tasks);
    }
    if (userDetails && userDetails.stress_tasks) {
      setStressTasks(userDetails.stress_tasks);
    }
  }, [userDetails]);

  const toggleTaskExpansion = (taskId) => {
    setExpandedTasks((prevExpandedTasks) => ({
      ...prevExpandedTasks,
      [taskId]: !prevExpandedTasks[taskId],
    }));
  };

  const markTaskAsComplete = async (user_id, taskId, therapyType) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/mark-task-complete",
        {
          user_id: user_id,
          task_id: taskId,
          therapy_type: therapyType,
        }
      );
      console.log(response.data.message); // Log the response message

      switch (therapyType) {
        case "depression":
          setDepressionTasks((prevTasks) => ({
            ...prevTasks,
            [`task${taskId}`]: true,
          }));
          break;
        case "anxiety":
          setAnxietyTasks((prevTasks) => ({
            ...prevTasks,
            [`task${taskId}`]: true,
          }));
          break;
        case "stress":
          setStressTasks((prevTasks) => ({
            ...prevTasks,
            [`task${taskId}`]: true,
          }));
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error marking task as complete:", error);
    }
  };

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
                          className={`task-section ${
                            expandedTasks[task.task_id] ? "expanded" : ""
                          }`}
                          key={task.task_id}
                          onClick={() => toggleTaskExpansion(task.task_id)}
                        >
                          <i
                            className={`bi bi-check-circle-fill ${
                              depressionTasks[`task${task.task_id}`]
                                ? "done"
                                : ""
                            }`}
                          ></i>
                          <span className="task-title">{task.task_title}</span>
                          <TaskDescription
                            taskDescription={task.info[0].task_description}
                            taskIcon={task.info[0].task_icon}
                            expanded={expandedTasks[task.task_id]}
                            user_id={userDetails.user_id}
                            taskId={task.task_id}
                            therapyType="depression"
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
              <h2>Anxiety Therapy- {anxiety_level} </h2>
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
                        {anxietyLevelTasks.tasks.map((task) => (
                          <div
                            className={`task-section ${
                              expandedTasks[task.task_id] ? "expanded" : ""
                            }`}
                            key={task.task_id}
                            onClick={() => toggleTaskExpansion(task.task_id)}
                          >
                            <i
                              className={`bi bi-check-circle-fill ${
                                anxietyTasks[`task${task.task_id}`]
                                  ? "done"
                                  : ""
                              }`}
                            ></i>
                            <span className="task-title">
                              {task.task_title}
                            </span>
                            <TaskDescription
                              taskDescription={task.info[0].task_description}
                              taskIcon={task.info[0].task_icon}
                              expanded={expandedTasks[task.task_id]}
                              user_id={userDetails.user_id}
                              taskId={task.task_id}
                              therapyType="anxiety"
                            />
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
              <h2>Stress Therapy- {stress_level} </h2>
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
                        {stressLevelTasks.tasks.map((task) => (
                          <div
                            className={`task-section ${
                              expandedTasks[task.task_id] ? "expanded" : ""
                            }`}
                            key={task.task_id}
                            onClick={() => toggleTaskExpansion(task.task_id)}
                          >
                            <i
                              className={`bi bi-check-circle-fill ${
                                stressTasks[`task${task.task_id}`] ? "done" : ""
                              }`}
                            ></i>
                            <span className="task-title">
                              {task.task_title}
                            </span>
                            <TaskDescription
                              taskDescription={task.info[0].task_description}
                              taskIcon={task.info[0].task_icon}
                              expanded={expandedTasks[task.task_id]}
                              user_id={userDetails.user_id}
                              taskId={task.task_id}
                              therapyType="stress"
                            />
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
            <Link to="/MainPage" className="program-link">
              Take program
            </Link>
          </div>
        </div>
      );
    }
  };

  const TaskDescription = ({
    taskDescription,
    taskIcon,
    expanded,
    user_id,
    taskId,
    therapyType,
  }) => {
    return (
      <div>
        <div className={`task-description ${expanded ? "expanded" : ""}`}>
          <div>
            <div className="quoted-disc">
              <i class="bi bi-quote quote"></i>
              <p>{taskDescription}</p>
              <i class="bi bi-quote right quote-right quote"></i>
            </div>
            <div className="image-container">
              <img src={taskIcon} alt="Task Icon" />
            </div>
          </div>
          <span
            className="mark-button"
            onClick={() => markTaskAsComplete(user_id, taskId, therapyType)}
          >
            Mark as Complete
          </span>
        </div>
      </div>
    );
  };

  return renderTherapySections();
};

export default TaskContent;
