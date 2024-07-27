import React, { useState } from 'react';
import '../styles/login.css';

//Components
import IconEye from './IconEye';
import IconEyeSlash from './IconEyeSlash';
import IconBxsUser from './IconBxsUser';
import IconBxsLockAlt from './IconBxsLockAlt';


const Login = (props) => {
  const { loggedIn, email, setEmail, password, setPassword, error } = props;

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(<IconEyeSlash />);

  const handleToggle = () => {
    if (type === 'password') {
      setType('text');
      setIcon(<IconEye />);
    } else {
      setType('password');
      setIcon(<IconEyeSlash />);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loggedIn(e);
  };


  return (
    <div className='login'>
      <form onSubmit={handleLogin} className='login-form'>

        <div className='login-content'>

          <div className='login-box'>
            <IconBxsUser />

            <div className='login--box-input'>
              <input
                className='login-input'
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>

          </div>

          <div className='login-box'>
            <IconBxsLockAlt />

            <div className='login-box-input'>
              <input
                className='login-input'
                type={type}
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </div>
            <span onClick={handleToggle}>{icon}</span>
          </div>

        </div>

        <button className='login-button'>Login</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

      </form>
    </div>
  );
};

export default Login;