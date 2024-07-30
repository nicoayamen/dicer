import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';

const CardStack = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  

  useEffect(() => {
    const userId = window.localStorage.getItem('userid');
    console.log('match page userid', userId)
    if (!userId) {
      console.error('User ID is not provided');
      return;
    }
    
    const getUser = async (getId) => {
      try {
        const response = await fetch(`/profile/match/${getId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }
        const data = await response.json();
        console.log("Fetched user:", data.user);
        setCurrentUser(data.user);
      } catch (err) {
        console.error(err.message);
      }
    };

    getUser(currentUserIndex + 1);
  }, [currentUserIndex]);

  //Match with a user
  const handleMatch = () => {
    console.log(`Match: ${currentUser.first_name}`);
    // Write to database: currentUser.id

    nextUser();
  };

  //Reject a user
  const handleReject = () => {
    console.log(`Reject: ${currentUser.first_name}`);
    nextUser();
  };

  //Go to next available user
  const nextUser = () => {
    setCurrentUserIndex((prevIndex) => prevIndex + 1);
  };


  return (
    <div>
      <h2>This is the match page!</h2>
      {currentUser ? (
        <UserCard
          user={currentUser}
          onMatch={handleMatch}
          onReject={handleReject}
        />
      ) : (
        <p>no more players :(</p>
      )}
    </div>
  );
};

export default CardStack;