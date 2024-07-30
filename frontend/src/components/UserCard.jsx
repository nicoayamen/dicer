import React from 'react'
import '../styles/userCard.css'

const UserCard = (props) => {
  const {user, onMatch, onReject} = props;

  return (
    <div className='user-card-container'>
      <div className="user-card-header"><p>Match with player?</p></div>
      <li className='user-list' key={user.id}>
        <div>{user.first_name}</div>
        <div>{user.photo}</div>
        <div>
          <button className='user-card-button' onClick={onMatch}>yes</button>
          <button className='user-card-button'onClick={onReject}>no</button>
        </div>
      </li>
    </div>
  )
}

export default UserCard