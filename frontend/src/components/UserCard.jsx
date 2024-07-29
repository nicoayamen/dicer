import React from 'react'
import '../styles/userCard.css'

const UserCard = (props) => {
  const {user, onMatch, onReject} = props;

  return (
    <div>
      <p>Match with player?</p>
      <li className='user-list' key={user.id}>
        <div>{user.first_name}</div>
        <div>{user.photo}</div>
        <div>
          <button onClick={onMatch}>yes</button>
          <button onClick={onReject}>no</button>
        </div>
      </li>
    </div>
  )
}

export default UserCard