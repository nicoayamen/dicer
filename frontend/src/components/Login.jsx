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
  
  // Unified form data management
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(<IconEyeSlash />);
  
  const navigate = useNavigate();

  // Redirect to profile page if user is still logged in
  useEffect(() => {
    const userId = window.localStorage.getItem('userid');
    if (userId) {
      navigate('/profile/userId')
    }
  }, [navigate]);

  // Update values as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Toggle password visibility
  const handleToggle = () => {
    if (type === 'password') {
      setType('text');
      setIcon(<IconEye />);
    } else {
      setType('password');
      setIcon(<IconEyeSlash />);
    }
  };

  // Handle login state for the submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('form submitted!', formData);
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData) // Sent formData as JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
      }

      const data = await response.json();
      console.log('User logged in successfully:', data);
      window.localStorage.setItem('userid', data.user[0].id);
      window.localStorage.setItem('fullName', data.user[0].first_name + ' ' + data.user[0].last_name);

      setLogin(true);
      setFormData({ email: '', password: '' }); // Reset form data after successful login
      setError('');
      navigate('/profile/userId');
      
    } catch (err) {
      console.error('There was an error logging in:', err);
      setError(err.message);
      setFormData({ email: '', password: '' }); // Reset form data on error
    }
  };

  return (
    <div className='login'>
      <h1>Login</h1> {/* Added h1 element for consistent styling */}

      <form onSubmit={handleSubmit} className='login-form'>
        <div className='login-content'>
          <div className='login-box'>
            <IconBxsUser />
            <Box
              sx={{
                width: 300,
                maxWidth: '100%',
              }}
            >
              <div className='login-box-input'>
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
              </div>
            </Box>
          </div>

          <div className='login-box'>
            <IconBxsLockAlt />
            <Box
              sx={{
                width: 300,
                maxWidth: '100%',
              }}
            >
              <div className='login-box-input'>
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
              </div>
            </Box>
            <span onClick={handleToggle}>{icon}</span>
          </div>

          <button type='submit' className='login-button'>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
