import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import '../styles/signup.css';


const Signup = (props) => {
  const { setLogin } = props;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();


  //update values as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('form submitted!', formData);
    try {
      //if using CORS, change fetch to 'http://localhost:8080/signup'
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
      }

      const data = await response.json();
      console.log('User signed up successfully:', data);
      window.localStorage.setItem('userid', data.id);
      window.localStorage.setItem('fullName', data.first_name + ' ' + data.last_name);
      setLogin(true);
      navigate('/profile/${userId}');

    } catch (error) {
      console.error('There was an error signing up:', error);
      setError(error.message);
    }

  };

  return (
    <div className='signup'>
      <h1>Sign Up</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} className='signup-form'>
        <div className='signup-content'>
          <div className='signup-box'>
          <Box
              sx={{
                width: 300,
                maxWidth: '100%',
              }}
            >
            <div className='signup-box-input'>

              <TextField fullWidth
                type='text'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                required
                variant="standard"
                label="First Name"
                color="secondary"
              />
            </div>

            <div className='signup-box-input'>

              <TextField fullWidth
                type='text'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                required
                variant="standard"
                label="Last Name"
                color="secondary"
              />
            </div>

            <div className='signup-box-input'>

              <TextField fullWidth
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                variant="standard"
                label="Email"
                color="secondary"
              />
            </div>

            <div className='signup-box-input'>

              <TextField fullWidth
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                variant="standard"
                label="Password"
                color="secondary"
              />
            </div>
            </Box>
            <button type='submit' className='signup-button'>Sign Up</button>

          </div>
        </div>
      </form>
    </div >
  );
};

export default Signup;