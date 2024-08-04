import React from 'react';
import Button from '@mui/material/Button';
import '../styles/userCard.css';

import MatchedModal from './MatchedModal';
import MatchFilter from './MatchFilter';

const UserCard = (props) => {
  const { user, onMatch, onReject, nextUser } = props;

  //Combine the onMatch with the modal opening 
  const handleMatchClick = (e) => {
    onMatch(e);
  };

  return (
    <div className='user-card-container'>
      <img className="user-card-profile-photo" src={user.photo} alt={`${user.first_name}`} />
      <h2 className='user-card-name'>{`${user.first_name}`}</h2>
      <div className='user-description'>Class: {user.class}</div>
      <div className='user-description'>DM: {user.is_dm ? 'Yes' : 'No'}</div>
      <div className='user-description'>{user.bio}</div>
      <MatchedModal 
        userName={user.first_name} 
        onMatch={handleMatchClick}
        onClose={nextUser}
        className='user-card-button'
      />
      <Button className='user-card-button' sx={{ m: 1, minWidth: 300 }} onClick={onReject}>Maybe next time!</Button>
      <MatchFilter />
    </div>
  );
};

export default UserCard;