import React from 'react';
import '../styles/userCard.css';

import MatchedModal from './MatchedModal';

const UserCard = (props) => {
  const { user, onMatch, onReject } = props;

  //Combine the onMatch with the modal opening 
  const handleMatchClick = (e, handleOpen) => {
    onMatch(e);
    handleOpen();
  };

  return (
    <div className='user-card-container'>
      <img className="profile-photo" src={user.photo} alt={`${user.first_name}`} />
      <h3>{`${user.first_name}`}</h3>
      <div className='user-description'>Class: {user.class}</div>
      <div className='user-description'>DM: {user.is_dm ? 'Yes' : 'No'}</div>
      <div className='user-description'>{user.bio}</div>
      <MatchedModal 
        userName={user.first_name} 
        onMatch={(e, handleOpen) => handleMatchClick(e, handleOpen)} 
      />
      <button className='user-card-button' onClick={onReject}>Nay</button>
    </div>
  );
};

export default UserCard;