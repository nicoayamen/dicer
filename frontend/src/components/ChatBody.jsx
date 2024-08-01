import React from 'react';
import { useNavigate } from "react-router-dom";

const ChatBody = ({ messages, lastMessageRef }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

return (
    <>
      <header className='chat__mainHeader'>
        <p>Hangout with Colleagues</p>
        <button className='leaveChat__btn' onClick={handleLeaveChat}>LEAVE CHAT</button>
      </header>

      <div className='message__container'>
        {messages.map(message => (
          <div className="message__chats" key={message.id}>
            <p>{message.username === localStorage.getItem("userName") ? "You" : message.username}</p>
            <div className={message.username === localStorage.getItem("userName") ? 'message__sender' : 'message__recipient'}>
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