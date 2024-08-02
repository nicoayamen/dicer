import React, { useState } from 'react';

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");

  const handleTyping = () => {
    const fullName = localStorage.getItem("fullName");
    if (fullName) {
      socket.emit("typing", { username: fullName });
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const fullName = localStorage.getItem("fullName");

    if (message.trim() && fullName) {
      const messageData = {
        username: fullName,
        content: message.trim(),
      };
      console.log("Sending message:", messageData); // Debugging output
      socket.emit("message", messageData);

      // Clear the message input
      setMessage("");
    } else {
      console.error("Message data is missing or invalid"); // Debugging output
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