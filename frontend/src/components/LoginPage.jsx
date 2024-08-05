import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './ DarkModeToggle';
import '../styles/login.css';

//Components
import Login from './Login';

const LoginPage = (props) => {
  const { email, setEmail, password, setPassword, error, setError, setLogin } = props;
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkmode') === 'true');

  // Dark mode toggle function
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
    localStorage.setItem('darkmode', !darkMode);
    document.body.classList.toggle('darkmode', !darkMode);
  };

  return (
    <div>
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> 
      <Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} setError={setError} setLogin={setLogin} />

      <div className='sign-up'>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;