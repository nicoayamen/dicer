import React, { useEffect, useState, useRef } from 'react';
/*
does not show active users in sidebar... yet
import ChatBar from './ChatBar';
*/
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    const username = localStorage.getItem("fullName");

    if (username) {
      socket.emit('join', username); // Request chat history
    }

    socket.on("chatHistory", (history) => {
      setMessages(history);
    });

    socket.on("messageResponse", (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    return () => {
      socket.off("messageResponse");
      socket.off("chatHistory");
    };
  }, [socket]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat">
      {/* <ChatBar socket={socket} typingStatus={typingStatus} / */}
      <div className='chat__main'>
        <ChatBody messages={messages} lastMessageRef={lastMessageRef} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;