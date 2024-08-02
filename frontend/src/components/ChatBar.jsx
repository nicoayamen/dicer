import React, { useState, useEffect } from 'react';

const ChatBar = ({ socket, typingStatus }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("newUserResponse", data => setUsers(data));
    return () => {
      socket.off("newUserResponse");
    };
  }, [socket]);

  return (
    <div className='chat__sidebar'>
      <h2>Open Chat</h2>
      <div>
        <h4 className='chat__header'>ACTIVE USERS</h4>
        <div className='chat__users'>
          {users.map(user => <p key={user.username}>{user.fullName}</p>)}
        </div>
      </div>
      <div className='message__status'>
        <p>{typingStatus}</p>
      </div>
    </div>
  );
};

export default ChatBar;