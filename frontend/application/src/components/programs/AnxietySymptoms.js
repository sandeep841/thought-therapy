//AnxietySymptoms.js

import React from "react";
import "../styles/Symptoms.css";

const AnxietySymptoms = () => {
  const symptoms = [
    {
      title: "Avoidance behaviors",
      description:
        "Avoiding situations or activities that trigger anxiety, leading to avoidance of certain places, people, or events.",
    },
    {
      title: "Feelings of impending doom",
      description:
        "A sense of impending danger or catastrophe, even without a clear threat.",
    },
    {
      title: "Panic attacks",
      description:
        "Sudden episodes of intense fear or discomfort, accompanied by physical symptoms such as chest pain, shortness of breath, or dizziness.",
    },
    {
      title: "Obsessive thoughts or behaviors",
      description:
        "Intrusive thoughts or repetitive behaviors that are difficult to control, such as compulsive checking or counting.",
    },
    {
      title: "Difficulty relaxing muscles",
      description:
        "Persistent muscle tension or stiffness, especially in response to anxiety triggers.",
    },
    {
      title: "Nausea or stomach upset",
      description:
        "Feeling nauseous or experiencing gastrointestinal discomfort, often in response to stress or anxiety.",
    },
    {
      title: "Sensory hypersensitivity",
      description:
        "Heightened sensitivity to sensory stimuli such as noise, light, or touch, leading to increased anxiety.",
    },
    {
      title: "Feeling detached or unreal",
      description:
        "Experiencing feelings of detachment from oneself or the world, known as depersonalization or derealization.",
    },
    {
      title: "Fear of losing control",
      description:
        "A persistent fear of losing control over one's thoughts, emotions, or behaviors, leading to increased anxiety.",
    },
    {
      title: "Hypochondria",
      description:
        "Excessive worry or preoccupation with physical health or the possibility of having a serious illness, despite reassurance from medical professionals.",
    },
  ];

  return (
    <div className="symptoms-main">
      <h1>Anxiety Symptoms</h1>
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

export default AnxietySymptoms;
