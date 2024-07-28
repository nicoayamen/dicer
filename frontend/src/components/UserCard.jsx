import React from 'react'

const UserCard = (props) => {
  const {card, onAccept, onDecline} = props;

  return (
    <div>
      <p>User card</p>
      <li className='card-list' key={card.id}>
        <div>{card.name}</div>
        <div>{card.image}</div>
        <button onClick={onAccept}>yes</button>
        <button onClick={onDecline}>no</button>
      </li>
    </div>
  )
}

export default UserCard