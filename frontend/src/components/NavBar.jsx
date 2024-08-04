import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/navbar.css';

const NavBar = (props) => {
  const { login, setLogin } = props;
  const [profile, setProfile] = useState(null);
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

  const handleLogOut = () => {
    window.localStorage.removeItem('userid')
    window.localStorage.removeItem('fullName')

    setLogin(false);
    navigate("/");
  };

  return (
    <div className='nav-bar'>
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

      {login && profile && (
        <div className='navbar-links'>
          <Link to='/profile/messages'>Messages</Link>
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
  );
};

export default NavBar;