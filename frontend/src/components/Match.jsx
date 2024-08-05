import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';

const CardStack = () => {
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const userId = Number(window.localStorage.getItem('userid'));


  //Get user profiles
  const getUnmatchedUser = async () => {
    try {
      const response = await fetch(`/profile/match/${userId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const data = await response.json();
      console.log("Fetched user:", data);
      setUsers(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUnmatchedUser();
  }, []);

  //Match with a user
  const handleMatch = async (e) => {
    e.preventDefault();
    const currentUser = users[currentUserIndex];
    if (!currentUser) return;

    try {
      const body = { userId, getId: currentUser.id };

      const response = await fetch(`/profile/match/${userId}/${currentUser.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    }
    finally {  }
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

  const currentUser = users[currentUserIndex];


  return (
    <div>
      {currentUser ? (
        <UserCard
          user={currentUser}
          onMatch={handleMatch}
          onReject={handleReject}
          nextUser={nextUser}
        />
      ) : (
        <p className="no-more-matches">
            Sorry, there are no more adventurers or DMs to match with!
            <br />
            Please check back later for future matches.
        </p>
      )}
    </div>
  );
};

export default CardStack;