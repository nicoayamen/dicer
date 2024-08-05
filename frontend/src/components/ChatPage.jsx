import React, { useEffect, useState, useRef } from 'react';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { useParams } from 'react-router-dom';
import '../styles/chatPage.css';

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);
  const { roomId } = useParams();

  useEffect(() => {
    const username = localStorage.getItem("fullName");

    if (username && roomId) {
      socket.emit('join_room', { username, roomId });
    }

    socket.on("chatHistory", (history) => {
      setMessages(history);
    });

    socket.on("receive_message", (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    socket.on("typing", (data) => {
      setTypingStatus(`${data.username} is typing...`);
      setTimeout(() => setTypingStatus(""), 3000); // Clear typing status after 3 seconds
    });

    return () => {
      socket.emit('leave_room', roomId);
      socket.off("receive_message");
      socket.off("chatHistory");
      socket.off("typing");
    };
  }, [socket, roomId]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat">
      <div className='chat__main'>
        <ChatBody messages={messages} lastMessageRef={lastMessageRef} />
        <ChatFooter socket={socket} />
      </div>
      {typingStatus && <p className='typingStatus'>{typingStatus}</p>}
    </div>
  );
};

export default ChatPage;