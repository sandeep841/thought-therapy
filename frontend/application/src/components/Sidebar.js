import React from "react";

const Sidebar = ({ userDetails }) => {
  const { depression_level, anxiety_level, stress_level } = userDetails;

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-item">
        {depression_level !== null && depression_level !== undefined && (
          <div
            className="sidebar-title"
            onClick={() => handleScrollToSection("depression-section")}
          >
            <span>Depression Therapy</span>
          </div>
        )}

        {anxiety_level !== null && anxiety_level !== undefined && (
          <div
            className="sidebar-title"
            onClick={() => handleScrollToSection("anxiety-section")}
          >
            <span>Anxiety Therapy</span>
          </div>
        )}

        {stress_level !== null && stress_level !== undefined && (
          <div
            className="sidebar-title"
            onClick={() => handleScrollToSection("stress-section")}
          >
            <span>Stress Therapy</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
