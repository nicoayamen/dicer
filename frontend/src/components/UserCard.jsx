import React from 'react';
import '../styles/userCard.css';

const UserCard = (props) => {
  const { user, onMatch, onReject } = props;

  return (
    <div className='user-card-container'>
      <img className="profile-photo" src={user.photo} alt={`${user.first_name}`} />
      <h3>{`${user.first_name}`}</h3>
      <div className='user-description'>Class: {user.class}</div>
      <div className='user-description'>DM: {user.is_dm ? 'Yes' : 'No'}</div>
      <div className='user-description'>{user.bio}</div>
      <button className='user-card-button' onClick={onMatch}>Yay</button>
      <button className='user-card-button' onClick={onReject}>Nay</button>
    </div>
  );
};

export default UserCard;