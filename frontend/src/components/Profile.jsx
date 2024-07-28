import React, { useState, useEffect } from 'react';
import '../styles/profile.css';

const Profile = ({ userId, onEdit, onSignOut, onDelete }) => {
  const [isLoading, setIsLoading] = useState(true); // State to track whether the profile data is still loading
  const [profileUser, setProfileUser] = useState({}); // Initialize with an empty object

  useEffect(() => {
    fetch(`/profile/`)
      .then(response => response.json())
      .then(data => {
        setProfileUser({
          photo: data.photo || '',
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          fullName: `${data.first_name || ''} ${data.last_name || ''}`,
        });
        setIsLoading(false); // Set isLoading to false once data is loaded
      })
      .catch(err => {
        console.error('Error fetching profile data:', err);
        setIsLoading(false); // Also stop loading state on error
      });
  }, [userId]);

  if (isLoading) { // Conditionally render based on loading state
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  return (
    <div className="profile-container"> 
      <div className="profile-header"> 
        <img
          src={profileUser.photo}
          alt="User"
          className="profile-photo"
        />
        <h1>Welcome, {profileUser.first_name} {profileUser.last_name}</h1> {/* Display user's first and last name*/}
      </div>
      <div className="profile-actions"> {/* Container for action buttons */}
        <button onClick={onEdit} className="profile-button">Edit Account</button> {/* Button to edit account */}
        <button onClick={onSignOut} className="profile-button">Sign Out</button> {/* Button to sign out */}
        <button onClick={onDelete} className="profile-button">Delete Account</button> {/* Button to delete account */}
      </div>
    </div>
  );
};

export default Profile;
