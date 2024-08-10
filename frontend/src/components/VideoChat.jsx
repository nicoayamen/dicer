import React, { useRef, useState, useEffect } from 'react';
import '../styles/videoChat.css';
import io from 'socket.io-client';

const VideoChat = ({ socket }) => {
  const [stream, setStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    // Initialize peer connection
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        {
          urls: 'turn:your.turn.server',
          credential: 'your_turn_server_credential',
          username: 'your_turn_server_username'
        }
      ]
    });

    setPeerConnection(pc);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('new-ice-candidate', { candidate: event.candidate });
      }
    };

    pc.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    return () => {
      pc.close();
    };
  }, [socket]);

  useEffect(() => {
    socket.on('video-offer', async (data) => {
      const { sdp } = data;
      try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(sdp));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('video-answer', { sdp: answer });
      } catch (err) {
        console.error('Error handling video offer:', err);
      }
    });

    socket.on('video-answer', async (data) => {
      try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
      } catch (err) {
        console.error('Error handling video answer:', err);
      }
    });

    socket.on('new-ice-candidate', async (data) => {
      try {
        await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
      } catch (err) {
        console.error('Error adding ICE candidate:', err);
      }
    });

    socket.on('end-video-chat', () => {
      endVideoChat();
    });

    return () => {
      socket.off('video-offer');
      socket.off('video-answer');
      socket.off('new-ice-candidate');
      socket.off('end-video-chat');
    };
  }, [socket, peerConnection]);

  const startVideoChat = async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = localStream;
      setStream(localStream);

      localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
      });

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socket.emit('video-offer', { sdp: offer });
    } catch (err) {
      console.error('Error starting video chat:', err);
    }
  };

  const endVideoChat = () => {
    // Stop all local media tracks
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  
    // Close the peer connection
    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
    }
  
    // Clear video sources
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
  
    // Notify the server that the video chat is ending
    socket.emit('end-video-chat');
  };

  return (
    <div>
      <div className='video-chats'>
        <video className='local_video' ref={localVideoRef} autoPlay muted />
        <video className='remote_video' ref={remoteVideoRef} autoPlay />
      </div>

      <div className='video-chat-btns'>
        <button className='sendBtn' onClick={startVideoChat}>Launch Video</button>
        <button className='leaveChat__btn' onClick={endVideoChat}>Disconnect Video</button>
      </div>
    </div>
  );
};

export default VideoChat;