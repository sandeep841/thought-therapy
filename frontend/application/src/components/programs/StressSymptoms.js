//StressSymptoms.js

import React from "react";
import "../styles/Symptoms.css";

const StressSymptoms = () => {
  const symptoms = [
    {
      title: "Rapid heartbeat or palpitations",
      description:
        "Feeling the heart pounding or racing in response to stressors.",
    },
    {
      title: "Emotional instability",
      description:
        "Experiencing mood swings or emotional volatility in response to stress.",
    },
    {
      title: "Catastrophizing",
      description:
        "Engaging in catastrophic thinking, where minor stressors are blown out of proportion.",
    },
    {
      title: "Hyperventilation",
      description:
        "Rapid or shallow breathing, often accompanied by feelings of anxiety or panic.",
    },
    {
      title: "Cognitive difficulties",
      description:
        "Trouble concentrating, organizing thoughts, or processing information under stress.",
    },
    {
      title: "Reduced immune function",
      description:
        "Increased susceptibility to illness or infections due to chronic stress.",
    },
    {
      title: "Heightened sensitivity to criticism",
      description:
        "Reacting strongly to perceived criticism or feedback from others.",
    },
    {
      title: "Perfectionism",
      description:
        "Striving for excessively high standards and becoming stressed when unable to meet them.",
    },
    {
      title: "Excessive worry about the future",
      description:
        "Dwelling on potential future events or outcomes, leading to increased stress levels.",
    },
    {
      title: "Excessive sweating",
      description:
        "Increased perspiration, especially in response to stressors or anxious situations.",
    },
  ];

  return (
    <div className="symptoms-main">
      <h1>Stress Symptoms</h1>
      <div className="symptoms-container">
        {symptoms.map((symptom, index) => (
          <div key={index} className="symptom-item">
            <h3>{symptom.title}</h3>
            <p>{symptom.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StressSymptoms;
