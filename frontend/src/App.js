import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';

/// imports for chat
import Home from './components/Home';
import ChatPage from './components/ChatPage';
import socketIO from 'socket.io-client';

//Components
import LoginPage from './components/LoginPage';
import Signup from './components/Signup';
import DeleteProfile from './components/DeleteProfile';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import Match from './components/Match';
import EditProfile from './components/EditProfile';
import Messages from './components/Messages';

const socket = socketIO.connect(`http://localhost:8080`);

function App() {
  const [login, setLogin] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const user = window.localStorage.getItem('userid');
    console.log('userid', user);
    if (user !== null) {
      setLogin(true);
    }
  }, []);

  //get current path, define where navbar should be hidden
  const location = useLocation();
  const hideNavBarPaths = ['/'];
  //check if current path is in hideNavBarPaths array
  const showNavBar = !hideNavBarPaths.includes(location.pathname);

  return (
      <div className="App">

        {showNavBar && <NavBar login={login} setLogin={setLogin} />}

        <Routes>
          <Route path='/home' element={<Home socket={socket} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path="/" element={<LoginPage email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} setError={setError} setLogin={setLogin} />} />
          <Route path="/signup" element={<Signup setLogin={setLogin} />} />
          <Route path="/profile/:userId/edit" element={<EditProfile />} />
          <Route path="/profile/:userId/delete" element={<DeleteProfile setLogin={setLogin} />} />
          <Route path="/chat/:roomId" element={<ChatPage socket={socket} />} />
          <Route path='/profile/match' element={<Match />} />
          <Route path='/profile/messages' element={<Messages />} />
        </Routes>
      </div>
  );
}

export default App;