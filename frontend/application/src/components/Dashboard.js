//Dashboard.js
import React, { useState, useEffect } from "react";
import "./styles/Dashboard.css"; // Import the CSS file
import Sidebar from "./Sidebar";
import TaskContent from "./TaskContent";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState({ username: "", message: "" });

  useEffect(() => {
    fetch("http://localhost:5000/dashboard")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user details");
        }
      })
      .then((data) => {
        console.log("Response data:", data); // Log the response data
        setUserDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setUserDetails({
          username: "",
          message: "Failed to fetch user details",
        });
      });
  }, []);

  return (
    <div className="main">
      <Sidebar userDetails={userDetails} />
      <TaskContent userDetails={userDetails} />
    </div>
  );
};

export default Dashboard;
