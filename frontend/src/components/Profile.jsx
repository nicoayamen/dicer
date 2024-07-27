import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = ({ user, onEdit, onSignOut, onDelete }) => {
  const [isLoading, setIsLoading] = useState(true); // State to track whether the profile data is still loading
  const [profileUser, setProfileUser] = useState(null); // State to store the profile user data

  useEffect(() => {
    if (user) { // Check if user data is available
      setProfileUser(user); // Set profileUser state with the user data
      setIsLoading(false); // Set isLoading to false once data is loaded
    }
  }, [user]);

  if (isLoading) { // Conditionally render based on loading state
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  return (
    <div className="profile-container"> 
      <div className="profile-header"> 
        <img
          src={profileUser.image} // Use user image
          alt="User"
          className="profile-image"
        />
        <h1>Welcome, {profileUser.fullName}</h1> {/* Display user's full name */}
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
