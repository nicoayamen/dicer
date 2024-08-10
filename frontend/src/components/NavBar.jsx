import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import '../styles/navbar.css';

const NavBar = (props) => {
  const { login, setLogin } = props;
  const [profile, setProfile] = useState(null);

  // Add dark mode
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for the dark mode preference
    return localStorage.getItem('darkmode') === 'true';
  });

  const navigate = useNavigate();
  const userId = window.localStorage.getItem('userid');

  useEffect(() => {
    if (login && userId) {
      fetch(`/profile/${userId}`)
        .then(response => response.json())
        .then(data => {
          setProfile(data);
        })
        .catch(err => {
          console.error('Error fetching profile:', err);
        });
    }
  }, [login, userId]);

  // Dark Mode useEffect 
  useEffect(() => {
    // Update localStorage when darkMode changes
    localStorage.setItem('darkmode', darkMode);
    // Apply dark mode class to body element
    document.body.classList.toggle('darkmode', darkMode);
  }, [darkMode]);


  const handleLogOut = () => {
    window.localStorage.removeItem('userid')
    window.localStorage.removeItem('fullName')

    setLogin(false);
    navigate("/");
  };

  // Dark mode toggle function
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`nav-bar ${darkMode ? 'dark-mode' : ''}`}>
      <div className='navbar-logo'>
        {login ? (
          <Link to='/profile/match'>
            <img
              src="https://github.com/nicoayamen/dicer/blob/dev/frontend/public/dicer-2.png?raw=true"
              alt="dicer logo"
              className='navbar-logo-img'
            />
          </Link>
        ) : (
          <img
            src="https://github.com/nicoayamen/dicer/blob/dev/frontend/public/dicer-2.png?raw=true"
            alt="dicer logo"
            className='navbar-logo-img'
          />
        )}
      </div>

      <div className='navbar-actions'>
        <IconButton 
          sx={{ ml: 1 }} 
          onClick={toggleDarkMode} 
          color="inherit"
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        {login && profile && (
          <div className='navbar-links'>
            <Link to='/profile/messages' className='navbar-link'>Messages</Link>
            <button onClick={handleLogOut} className='navbar-logout-button'>Sign Out</button>
            <Link to={`/profile/${userId}`}>
              <img
                src={profile.photo ? profile.photo : 'https://github.com/nicoayamen/dicer/blob/dev/frontend/public/dicer-2.png?raw=true'}
                alt='Profile'
                className='navbar-profile-photo'
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
