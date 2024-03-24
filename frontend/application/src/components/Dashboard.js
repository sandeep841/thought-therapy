import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState({ user_id: '', message: '' });

  useEffect(() => {
    fetch('http://localhost:5000//dashboard')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch user details');
        }
      })
      .then(data => setUserDetails(data))
      .catch(error => {
        console.error('Error fetching user details:', error);
        setUserDetails({ user_id: '', message: 'Failed to fetch user details' });
      });
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
      {userDetails.message ? (
        <p>{userDetails.message}</p>
      ) : (
        <p>User ID: {userDetails.user_id}</p>
      )}
    </div>
  );
};

export default Dashboard;
