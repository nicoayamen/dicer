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
    window.localStorage.removeItem('userid');
    setLogin(false);
    navigate("/");
  };

  return (
    <div className='nav-bar'>
      <div className='navbar-logo'>
        {login ? (
          <Link to='/match'>
            <img
              src="https://static.vecteezy.com/system/resources/previews/014/893/346/original/dice-d20-icon-design-free-vector.jpg"
              alt="dicer logo"
              className='navbar-logo-img'
            />
          </Link>
        ) : (
          <img
            src="https://static.vecteezy.com/system/resources/previews/014/893/346/original/dice-d20-icon-design-free-vector.jpg"
            alt="dicer logo"
            className='navbar-logo-img'
          />
        )}
      </div>

      {login && profile && (
        <div className='navbar-links'>
          <Link to='/messages'>Messages</Link>
          <button onClick={handleLogOut} className='navbar-logout-button'>Logout</button>
          <Link to={`/profile`}>
            <img
              src={profile.photo ? profile.photo : 'http://placehold.it/50x50'}
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