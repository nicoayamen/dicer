import React, { useState } from 'react';

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const roomId = window.location.pathname.split('/').pop(); // Extract roomId from URL

  const handleTyping = () => {
    const fullName = localStorage.getItem("fullName");
    if (fullName) {
      socket.emit("typing", { roomId, username: fullName });
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const fullName = localStorage.getItem("fullName");

    if (message.trim() && fullName && /^chat_\d+_\d+$/.test(roomId)) {
      const messageData = {
        roomId: roomId,
        username: fullName,
        content: message.trim(),
      };
      console.log("Sending message:", messageData);
      socket.emit("send_message", messageData);

      // Clear the message input
      setMessage("");
    } else {
      console.error("Message data is missing or invalid");
    }
  };

  return (
    <div className='chat__footer'>
      <form className='form' onSubmit={handleSendMessage}>
        <input 
          type="text" 
          placeholder='Write message' 
          className='message' 
          value={message} 
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;