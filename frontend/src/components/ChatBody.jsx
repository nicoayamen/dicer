import React from 'react';
import { useNavigate } from "react-router-dom";

const ChatBody = ({ messages, lastMessageRef, typingStatus  }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    navigate("/");
    window.location.reload();
  };

  const fullName = localStorage.getItem('fullName');
  const recipient = messages.find(message => message.username && message.username.trim() !== fullName?.trim());
  const recipientName = recipient ? recipient.username : "Dicer";


  return (
    <>
      <header className='chat__mainHeader'>
        <h2>{recipientName}</h2>
        {/*<button className='leaveChat__btn' onClick={handleLeaveChat}>LEAVE CHAT</button>*/}
      </header>

      <div className='message__container'>
        {messages.map(message => (
          <div className="message__chats" key={message.id}>
            <p className={message.username === fullName ? 'sender__name' : 'recipient__name'}>
              {message.username === fullName ? "You" : message.username}
            </p>
            <div className={message.username === fullName ? 'message__sender' : 'message__recipient' }>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={lastMessageRef} />
      </div>
      {/* Display typing status */}
      {typingStatus && <p className='typingStatus'>{typingStatus}</p>}
    </>
  );
};

export default ChatBody;
