import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';

//Components
import LoginPage from './components/LoginPage';
import Signup from './components/Signup';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import Match from './components/Match';

function App() {
  const [login, setLogin] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const user = window.localStorage.getItem('userid');
    console.log('userid', user)
    if (user !== null) {
      setLogin(true);
    }
  }, []);
  

  return (
    <BrowserRouter>
      <div className="App">

        <NavBar login={login} setLogin={setLogin} />        

        <Routes>
          <Route path='/profile' element={<Profile />} />
          <Route path='/' element={<LoginPage email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} setError={setError} setLogin={setLogin} />} />
          <Route path="/signup" element={<Signup setLogin={setLogin} />} />
          <Route path='/match' element={<Match />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
