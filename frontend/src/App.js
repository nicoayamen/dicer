import { BrowserRouter, Routes, Route, Router, Link } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

//Components
import LoginPage from './components/LoginPage';
import Signup from './components/Signup';


function App() {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Handle login state
  const loggedIn = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const body = { email, password };
      console.log(body);
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      console.log(data);
      setLogin(true);
      setEmail('');
      setPassword('');

    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage login={login} loggedIn={loggedIn} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
