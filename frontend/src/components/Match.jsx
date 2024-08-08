import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';

const Match = () => {
  const userId = Number(window.localStorage.getItem('userid'));
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [filters, setFilters] = useState({ classType: '', isDM: undefined }); 


  // Fetch user profiles with filtering
  const getUnmatchedUser = async () => {
    try {
      const { classType, isDM } = filters;
      let url = `/profile/match/${userId}`;

      //Send class and DM as parameters if filtering
      if (classType) url += `/${classType}`;
      if (isDM !== undefined) url += `/${isDM}`;

      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const data = await response.json();
      console.log("Fetched user:", data);
      setUsers(data);
      setCurrentUserIndex(0);  // Reset the current user index
    } catch (err) {
      setUsers([]);
      console.error(err.message);
    }
  };

  //Show potential matches on page load
  useEffect(() => {
    getUnmatchedUser();
  }, [filters]);

  //Set filter data
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };


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

  //Get unfiltered unmatched users from beginning
  const handleRestart = () => {
    getUnmatchedUser();
    setFilters({ classType: '', isDM: undefined })
  }

  const currentUser = users[currentUserIndex];


  return (
    <div>
      {currentUser ? (
        <UserCard
          user={currentUser}
          onMatch={handleMatch}
          onReject={handleReject}
          nextUser={nextUser}
          handleFilterChange={handleFilterChange}
        />
      ) : (
        <p className="no-more-matches">
          Sorry, there are no more Players or Dungeon Masters to match with!
          <br />
          Please check back later for future matches!
          <br />
          <button onClick={handleRestart}>Start over</button>
       </p>
      )}
    </div>
  );
};

export default Match;