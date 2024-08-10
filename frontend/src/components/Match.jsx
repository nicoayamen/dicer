import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import '../styles/match.css';
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

      //Add isDM parameter to url
      if (isDM !== undefined) {
        url += `/${isDM}`;
      }

      //Add classType parameter to url only if isDM is false or undefined
      if (!isDM && classType) {
        url += `/${classType}`;
      }

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
    finally { }
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
    setFilters({ classType: '', isDM: undefined });
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
          handleFilterChange={handleFilterChange}
        />
      ) : (
        <h3 className='match-no-more-matches'>
          Sorry, there are no more Players or Dungeon Masters left in the campaign!
          <br />
          Return later to discover new companions, or take another look!
          <br />
          <Button className='match-start-over-button' onClick={handleRestart}sx={{ m: 1, minWidth: 200, mt: 3 }}>Start over</Button>
       </h3>
      )}
    </div>
  );
};

export default Match;