import React from 'react';
import { useNavigate } from "react-router-dom";

const ChatBody = ({ messages, lastMessageRef }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    navigate("/");
    window.location.reload();
  };

  const fullName = localStorage.getItem('fullName');

return (
    <>
      <header className='chat__mainHeader'>
        <p>Dicer</p>
        <button className='leaveChat__btn' onClick={handleLeaveChat}>LEAVE CHAT</button>
      </header>

      <div className='message__container'>
        {messages.map(message => (
          <div className="message__chats" key={message.id}>
            <p>{message.username === fullName ? "You" : message.username}</p>
            <div className={message.username === fullName ? 'message__sender' : 'message__recipient'}>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;