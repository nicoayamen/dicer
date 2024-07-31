import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';

const CardStack = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const userId = Number(window.localStorage.getItem('userid'));

  //Skip if fetched user is the logged in user
  if (userId - 1 === currentUserIndex) {
    setCurrentUserIndex(currentUserIndex + 1)
  };

  //Get user profiles
  const getUser = async (getId) => {
    try {
      const response = await fetch(`/profile/match/${getId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const data = await response.json();
      console.log("Fetched user:", [data.user, data.role]);
      setCurrentUser(data.user);
      setRole(data.role);
    } catch (err) {
      console.error(err.message);
    }
  };

  //Get users one by one
  useEffect(() => { 
    if (currentUserIndex >= 0) {
      getUser(currentUserIndex + 1);
    }    
  }, [currentUserIndex]);

  //Match with a user
  const handleMatch = async (e) => {
    console.log(`Match: ${currentUser.id} - ${currentUser.first_name}`);
    e.preventDefault();

    try {
      const getId = currentUser.id;  
      const body = { userId, getId };
      console.log('sending data', body);
      
      const response = await fetch(`/profile/match/${userId}/${getId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    }
    finally {nextUser();}    
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
      <h2>Match?</h2>
      {currentUser ? (
        <UserCard
          user={currentUser}
          role={role}
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