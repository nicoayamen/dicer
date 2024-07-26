import React, { useState } from 'react';
import IconEye from './IconEye';
import IconEyeSlash from './IconEyeSlash';
import IconBxsUser from './IconBxsUser';
import IconBxsLockAlt from './IconBxsLockAlt';
import '../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [login, setLogin] = useState(false);
  //const [error, setError] = useState("");
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

  const handleLogOut = () => {
    setLogin(false);
  };

  const handleSubmit = async (e) => {
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
      setpassword('');

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>

      <h1>Dicer</h1>

      {login ? (
        <div>
          <h2>Welcome!</h2>
          <button onClick={handleLogOut}>Logout</button>
        </div>
      ) :
        (
          <div className='login'>
          <form onSubmit={handleSubmit} className='login-form'>

            <div className='login-content'>
              <div className='login-box'>
              <IconBxsUser />
                <div className='login--box-input'>                  
                  <input
                    className='login-input'
                    type='email'
                    placeholder=' '
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                  <label htmlFor='' className='login-label'>Email</label>
                </div>
              </div>

              <div className='login-box'>
              <IconBxsLockAlt />
                <div className='login-box-input'>                  
                  <input
                    className='login-input'
                    type={type}
                    placeholder=' '
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    required />
                  <label htmlFor='' className='login-label'>Password</label>
                  <span onClick={handleToggle}>{icon}</span>
                </div>

                <button className='login-button'>Login</button>

                <div className='sign-up'>
                  <p>Don't have an account? <a href='#'>Sign Up!</a></p>
                </div>

              </div>

            </div>

          </form>
          </div>

        )}

    </div>
  );
};

export default Login;