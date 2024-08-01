import React, { useEffect, useState } from 'react';

const Messages = () => {
  const [userName, setUserName] = useState([]);
  const userId = Number(window.localStorage.getItem('userid'));

  //Fetch users that the logged-in user matched with
  const getUsers = async (userId) => {
    try {
      const response = await fetch(`/profile/messages/${userId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const data = await response.json();
      console.log("Message user ids:", data);
      setUserName(data);
    }
    catch (err) {
      console.error(err.message);
    }
  };

  //Get users on page load
  useEffect(() => {
    if (userId) {
      getUsers(userId);
    }
  }, []);


  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {userName.map(name => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
};


export default Messages;