import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';

const Profile = (props) => {
  const navigate = useNavigate();

  // State to manage loading status and profile user data
  const [isLoading, setIsLoading] = useState(true);
  const [profileUser, setProfileUser] = useState({});

  useEffect(() => {
    // Retrieve userID from localStorage
    const userId = window.localStorage.getItem('userid');
    if (!userId) {
      console.error('User ID is not provided');
      return;
    }

    // Fetch user profile data from API
    fetch(`/profile/${userId}`)
      .then(response => {
        // Check if response is successful
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Update state with profile user data
        setProfileUser({
          photo: data.photo || '',
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          fullName: `${data.first_name || ''} ${data.last_name || ''}`,
        });
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching profile data:', err);
        setIsLoading(false);
      });
  }, []);

  // Navigate to Edit Account page when the button is clicked
  const handleEditClick = () => {
    const userId = window.localStorage.getItem('userid'); 
    if (userId) {
      navigate(`/profile/${userId}/edit`); 
    } else {
      console.error('User ID is not provided');
    }
  };

  // Clear user ID from localStorage and navigate to home page on sign out
  const handleSignOut = () => {
    window.localStorage.removeItem('userid');
    window.localStorage.removeItem('fullName');
    navigate("/");
  };

  // Navigate to Delete Account page when the button is clicked
  const handleDeleteClick = () => {
    const userId = window.localStorage.getItem('userid'); 
    if (userId) {
      navigate(`/profile/${userId}/delete`);
    } else {
      console.error('User ID is not defined');
    }
  };

  const handleMatchButton = () => {
    navigate('/profile/match')
  };

  // Show loading message while profile data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render the profile page with user information and action buttons
  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profileUser.photo ? profileUser.photo : 'https://github.com/nicoayamen/dicer/blob/dev/frontend/public/dicer-2.png?raw=true'} className="profile-photo" alt="Profile" />
        <h1>Welcome, {profileUser.firstName} {profileUser.lastName}</h1>
      </div>
      <div className="profile-actions">
      <button onClick={handleMatchButton} className="profile-button">Start Matching!</button>
        <button onClick={handleEditClick} className="profile-button">Edit Account</button>
        <button onClick={handleSignOut} className="profile-button">Sign Out</button>
        <button onClick={handleDeleteClick} className="profile-button">Delete Account</button>
      </div>
    </div>
  );
};

export default Profile;
