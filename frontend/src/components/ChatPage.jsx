import React, { useEffect, useState, useRef } from 'react';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import VideoChat from './VideoChat';
import { useParams } from 'react-router-dom';
import '../styles/chatPage.css';

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const [videoChatActive, setVideoChatActive] = useState(false);
  const lastMessageRef = useRef(null);
  const { roomId } = useParams();

  const handleStartVideoChat = () => {
    setVideoChatActive(false);  // Force remount
    setTimeout(() => setVideoChatActive(true), 100); // Re-enable after a small delay
  };

  const handleEndVideoChat = () => {
    setVideoChatActive(false);
  };

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
      <ChatBody messages={messages} lastMessageRef={lastMessageRef} typingStatus={typingStatus} />
        <ChatFooter socket={socket} />
        <button className='start-video-button' onClick={handleStartVideoChat}>Start Video Chat</button>
        {videoChatActive && <VideoChat className='video-chat' socket={socket} roomId={roomId} onEndCall={handleEndVideoChat} />}
      </div>
    </div>
  );
};

export default ChatPage;