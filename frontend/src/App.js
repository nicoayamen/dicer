import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

// Components
import LoginPage from './components/LoginPage';
import Signup from './components/Signup';
import NavBar from './components/NavBar';
import Profile from './components/Profile';

function App() {
  const [login, setLogin] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);

  const loggedIn = async (e) => {
    if (e === null) {
      setLogin(false);
      return;
    }

    e.preventDefault();
    console.log(email, password);

    try {
      const body = { email, password };
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
      console.log('Login response data:', data.user[0]);
      setLogin(true);
      setEmail('');
      setPassword('');
      setError('');
      console.log('checking userId',data.user[0].id)
      setUserId(data.user[0].id);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      setEmail('');
      setPassword('');
    }
  };

  const ProfileWithParams = (props) => {
    const { userId } = useParams();
    console.log("userId in profileParams", userId);
    return <Profile userId={userId} {...props} />;
  };

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar login={login} loggedIn={loggedIn} />

        <Routes>
          <Route
            path="/"
            element={
              login ? <Navigate to={`/profile/${userId}`} /> : (
                <LoginPage
                  loggedIn={loggedIn}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  error={error}
                />
              )
            }
          />
          <Route path="/signup" element={<Signup setLogin={setLogin} />} />
          {login && (
            <Route path="/profile/:userId" element={<ProfileWithParams />} />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
