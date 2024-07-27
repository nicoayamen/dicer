import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const NavBar = (props) => {
  const { login, loggedIn } = props;

  //Change login state to logged out
  const handleLogOut = () => {
    loggedIn(null);
    navigate("/")
  };

  const navigate = useNavigate()

  return (
    <div className='nav-bar'>
      <h1>Dicer</h1>

      {login ?
        <div>
          <h3>you're logged in</h3>
          <button onClick={handleLogOut}>Logout</button>
        </div>
        : <div>Login or Sign Up</div>
      }
    </div>
  );
};

export default NavBar;