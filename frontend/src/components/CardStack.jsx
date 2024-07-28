import React, { useState } from 'react';
import UserCard from './UserCard';

const CardStack = () => {
  const cards = [
    {id: 1, name: 'Jasper', image: 'pic of jasper'},
    {id: 2, name: 'Eve', image: 'pic of eve'}
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  //Match with a user
  const handleAccept = () => {
    console.log(`Accepted: ${cards[currentIndex].name}`);
    nextUser();
  };


  const handleDecline = () => {
    console.log(`Declined: ${cards[currentIndex].name}`);
    nextUser();
  };

  const nextUser = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };


  return (
    <div>
      <h1>Look at all the users!</h1>
      {cards.length > 0 ? (
        <UserCard 
          card={cards[currentIndex]} 
          onAccept={handleAccept} 
          onDecline={handleDecline} 
        />
      ) : (
        <p>No more users to display.</p>
      )}
    </div>
  );
};

export default CardStack;