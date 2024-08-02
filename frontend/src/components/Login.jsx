import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

//Components
import IconEye from './IconEye';
import IconEyeSlash from './IconEyeSlash';
import IconBxsUser from './IconBxsUser';
import IconBxsLockAlt from './IconBxsLockAlt';


const Login = (props) => {
  const { email, setEmail, password, setPassword, error, setError, setLogin } = props;

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(<IconEyeSlash />);

  const navigate = useNavigate();

  //Redirect to profile page if user is still logged in
  useEffect(() => {
    const userId = window.localStorage.getItem('userid');
    if(userId) {
      navigate('/profile/userId')
    }
  })

  //Toggle password visibility
  const handleToggle = () => {
    if (type === 'password') {
      setType('text');
      setIcon(<IconEye />);
    } else {
      setType('password');
      setIcon(<IconEyeSlash />);
    }
  };

  //Handle login state for the submit button
  const handleLogin = async (e) => {
    e.preventDefault();
    
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
      console.log(data.user[0].id);
      window.localStorage.setItem('userid', data.user[0].id)

      setLogin(true);
      setEmail('');
      setPassword('');
      setError('');
      navigate('/profile/userId');
      
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      setEmail('');
      setPassword('');
    }
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
