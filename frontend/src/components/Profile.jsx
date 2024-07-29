import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';

const Profile = ({ userId, onSignOut, onDelete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileUser, setProfileUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userId = window.localStorage.getItem('userid');
    if (!userId) {
      console.error('User ID is not provided');
      return;
    }

    console.log('Fetching profile for userId:', userId); // Debug log

    fetch(`/profile/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Profile data received:', data); // Debug log
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
  }, [userId]);

  const handleEditClick = () => {
    navigate(`/editprofile/${userId}`); // Use navigate for redirection
  };
  //Change login state to logged out
  const handleSignOut = () => {
    window.localStorage.removeItem('userid')
    navigate("/");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profileUser.photo} className="profile-photo" alt="Profile" />
        <h1>Welcome, {profileUser.firstName} {profileUser.lastName}</h1>
      </div>
      <div className="profile-actions">
        <button onClick={handleEditClick} className="profile-button">Edit Account</button>
        <button onClick={handleSignOut} className="profile-button">Sign Out</button>
        <button onClick={onDelete} className="profile-button">Delete Account</button>
      </div>
    </div>
  );
};

export default Profile;
