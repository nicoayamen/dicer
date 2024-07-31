import React from 'react';
import '../styles/userCard.css';

const UserCard = (props) => {
  const { user, role, onMatch, onReject } = props;

  return (
    <div className='user-card-container'>
      <li className='user-list' key={user.id}>
        <div className='user-name'>{user.first_name}</div>
        <div className='user-description'>{user.photo}</div>
        <div className='user-description'>{role.class}</div>
        <div className='user-description'>{role.bio}</div>
        <div>
          <button className='user-card-button' onClick={onMatch}>yes</button>
          <button className='user-card-button' onClick={onReject}>no</button>
        </div>
      </li>
    </div>
  );
};

export default UserCard;