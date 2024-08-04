import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/messages.css';

const Messages = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const userId = Number(window.localStorage.getItem('userid'));
  const navigate = useNavigate();

  const getUsers = async (userId) => {
    try {
      const response = await fetch(`/profile/messages/${userId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const data = await response.json();
      console.log("Message users data:", data);
      setUsers(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (userId) {
      getUsers(userId);
    }
  }, [userId]);

  const handleUserClick = (matchedUserId) => {
    const roomId = `chat_${[userId, matchedUserId].sort().join('_')}`;
    navigate(`/chat/${roomId}`);
  };

  const placeholderPhoto = 'https://github.com/nicoayamen/dicer/blob/dev/frontend/public/dicer-2.png?raw=true';

  return (
    <div className='messages'>
      <h1>Messages</h1>
      <div className='messages-users'>
        <ul>
          {users.map(user => (
            <li
              key={user.user_id}
              className='messages-user-item'
              onClick={() => handleUserClick(user.user_id)}
            >
              <img
                src={user.matched_user_photo ? user.matched_user_photo : placeholderPhoto}
                alt={`${user.matched_user_first_name} photo`}
                className='messages-user-profile-photo'
              />
              <span className='messages-users-name'>
                {user.matched_user_first_name} {user.matched_user_last_name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Messages;