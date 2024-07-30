import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const DeleteProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileUser, setProfileUser] = useState({});
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      console.error('User ID is not provided');
      return;
    }

    fetch(`/profile/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProfileUser({
          photo: data.photo || '',
          fullName: `${data.first_name || ''} ${data.last_name || ''}`,
        });
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching profile data:', err);
        setIsLoading(false);
      });
  }, [userId]);

  const handleDelete = () => {
    fetch(`/deleteprofile/${userId}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        navigate('/signup'); // Navigate to a confirmation page
      })
      .catch(err => {
        console.error('Error deleting account:', err);
      });
  };

  const handleBack = () => {
    navigate(`/profile/${userId}`); // Navigate back to the profile page
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="delete-profile-container">
      <div className="delete-profile-header">
        <img src={profileUser.photo} className="profile-photo" alt="Profile" />
        <h1>{profileUser.fullName}, are you sure you want to delete your account?</h1>
      </div>
      <div className="delete-profile-actions">
        <button onClick={handleDelete} className="profile-button">Confirm</button>
        <button onClick={handleBack} className="profile-button">Back</button>
      </div>
    </div>
  );
};

export default DeleteProfile;
