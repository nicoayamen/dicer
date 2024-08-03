import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import '../styles/login.css';

// Components
import IconEye from './IconEye';
import IconEyeSlash from './IconEyeSlash';
import IconBxsUser from './IconBxsUser';
import IconBxsLockAlt from './IconBxsLockAlt';

const Login = (props) => {
  const { setLogin } = props;
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(<IconEyeSlash />);
  
  const navigate = useNavigate();

  useEffect(() => {
    const userId = window.localStorage.getItem('userid');
    if (userId) {
      navigate('/profile/userId');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggle = () => {
    if (type === 'password') {
      setType('text');
      setIcon(<IconEye />);
    } else {
      setType('password');
      setIcon(<IconEyeSlash />);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
      }

      const data = await response.json();
      window.localStorage.setItem('userid', data.user[0].id);
      window.localStorage.setItem('fullName', `${data.user[0].first_name} ${data.user[0].last_name}`);

      setLogin(true);
      setFormData({ email: '', password: '' });
      setError('');
      navigate('/profile/userId');
    } catch (err) {
      setError(err.message);
      setFormData({ email: '', password: '' });
    }
  };

  return (
    <div className='login'>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} className='login-form'>
        <div className='login-content'>
          <div className='login-box'>
            <div className='input-icon'>
              <IconBxsUser />
            </div>
            <Box sx={{ width: 300, maxWidth: '100%' }}>
              <TextField
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                variant="standard"
                label="Email"
                color="secondary"
                fullWidth
              />
            </Box>
          </div>

          <div className='login-box'>
            <div className='input-icon'>
              <IconBxsLockAlt />
            </div>
            <Box sx={{ width: 300, maxWidth: '100%' }}>
              <TextField
                type={type}
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                variant="standard"
                label="Password"
                color="secondary"
                fullWidth
              />
            </Box>
            <span onClick={handleToggle} className='visibility-icon'>{icon}</span>
          </div>

          <button type='submit' className='login-button'>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
