import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';

// Components
import LoginPage from './components/LoginPage';
import Signup from './components/Signup';
import DeleteProfile from './components/DeleteProfile';
/// imports for chat start here
import Home from './components/Home';
import ChatPage from './components/ChatPage';
import socketIO from 'socket.io-client';
/// end here
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';

const socket = socketIO.connect(`http://localhost:8080`);

function App() {
  const [login, setLogin] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const user = window.localStorage.getItem('userid');
    if (user !== null) {
      setLogin(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">

        <NavBar login={login} setLogin={setLogin} />        

        <Routes>
        <Route path='/home' element={<Home socket={socket}/>} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/" element={<LoginPage email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} setError={setError} setLogin={setLogin} />} />
          <Route path="/signup" element={<Signup setLogin={setLogin} />} />

          <Route path="/profile/:userId/edit" element={<EditProfile />} />
          <Route path="/profile/:userId/delete" element={<DeleteProfile />} />
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;