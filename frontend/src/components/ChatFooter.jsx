import React, { useState } from 'react';

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");

  const handleTyping = () => {
    const username = localStorage.getItem("userName");
    if (username) {
      socket.emit("typing", { username });
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const username = localStorage.getItem("userName");

    if (message.trim() && username) {
      const messageData = {
        username,
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