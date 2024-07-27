import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

//Components
import LoginPage from './components/LoginPage';
import Signup from './components/Signup';
import NavBar from './components/NavBar';


function App() {
  const [login, setLogin] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Handle login state
  const loggedIn = async (e) => {
    if (e === null) {
      setLogin(false);
      return;
    }

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
      setError('');
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      setEmail('');
      setPassword('');
    }
  };
  //Change login state to logged out
  const handleLogOut = () => {
    loggedIn(null);
  };

  return (
    <BrowserRouter>
      <div className="App">

      <NavBar login={login} loggedIn={loggedIn} />

        {login ? 
          <div>
            <h2>Welcome!</h2>
            <button onClick={handleLogOut}>Logout</button>
          </div>
        : 

        <Routes>
          <Route path="/"
            element={
            <LoginPage
              loggedIn={loggedIn}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              error={error}
            />} 
          />

          <Route path="/signup"
            element={
              <Signup
                login={login}
                loggedIn={loggedIn}
              />}
          />
        </Routes>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
