import React from "react";
import "../styles/Symptoms.css";

const DepressionSymptoms = () => {
  const symptoms = [
    {
      title: "Feelings of worthlessness",
      description:
        "A pervasive sense of inadequacy or self-doubt that affects self-esteem.",
    },
    {
      title: "Social withdrawal",
      description:
        "Avoiding social interactions and isolating oneself from others.",
    },
    {
      title: "Recurrent thoughts of death",
      description:
        "Frequent thoughts about death or dying, even without active suicidal intent.",
    },
    {
      title: "Slowed movements and speech",
      description:
        "Physical and cognitive slowing down, including slowed speech and movement.",
    },
    {
      title: "Unexplained physical symptoms",
      description:
        "Persistent physical complaints such as headaches, digestive problems, or chronic pain with no clear medical cause.",
    },
    {
      title: "Difficulty experiencing pleasure",
      description:
        "Anhedonia, or the inability to feel joy or pleasure from activities that were once enjoyable.",
    },
    {
      title: "Persistent feelings of sadness or emptiness",
      description:
        "A deep, pervasive feeling of sadness or emptiness that persists over time.",
    },
    {
      title: "Memory problems",
      description:
        "Difficulty remembering details, making decisions, or recalling information.",
    },
    {
      title: "Difficulty with daily tasks",
      description:
        "Struggling to complete routine tasks like personal hygiene, household chores, or work responsibilities.",
    },
  ];

  return (
    <div>
      <h1>Depression Symptoms</h1>
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

export default DepressionSymptoms;
