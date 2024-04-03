//Sidebar.js
import React from "react";

const Sidebar = () => {
  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <div
          className="sidebar-title"
          onClick={() => handleScrollToSection("depression-section")}
        >
          <span>Depression Therapy</span>
        </div>

        <div
          className="sidebar-title"
          onClick={() => handleScrollToSection("anxiety-section")}
        >
          <span>Anxiety Therapy</span>
        </div>

        <div
          className="sidebar-title"
          onClick={() => handleScrollToSection("stress-section")}
        >
          <span>Stress Therapy</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
