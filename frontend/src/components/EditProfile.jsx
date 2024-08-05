import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import '../styles/editprofile.css';

const EditProfile = (props) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { setLogin } = props;

  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    classType: '',
    isDM: false,
    bio: '',
    photo: null
  });

  //state to preview image at after selection
  const [imagePreview, setImagePreview] = useState('http://placehold.it/150x150');

  useEffect(() => {
    fetch(`/editprofile/${userId}`)
      .then(response => response.json())
      .then(data => {
        const { user, role } = data;
        setProfile(user);
        setFormData({
          firstName: user.first_name || '',
          lastName: user.last_name || '',
          email: user.email || '',
          classType: role?.class || '',
          isDM: role?.is_dm || false,
          bio: role?.bio || '',
          photo: null,
          roleId: role?.id
        });
        setImagePreview(user.photo ? user.photo : 'http://placehold.it/150x150');
      })
      .catch(err => {
        console.error('Error fetching profile data:', err);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'radio' ? value === 'true' : value
    });
  };

  //Handles file input changes: updates the image preview and sets the selected file in the form data.
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData({
        ...formData,
        photo: file
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('email', formData.email);
    data.append('classType', formData.classType);
    data.append('isDM', formData.isDM);
    data.append('bio', formData.bio);
    if (formData.roleId) {
      data.append('roleId', formData.roleId);
    }
    if (formData.photo) {
      data.append('photo', formData.photo);
    }

    fetch(`/editprofile/${userId}`, {
      method: 'POST',
      body: data
    })
      .then(response => response.json())
      .then(data => {
        setProfile(data);
        alert('Profile updated successfully');
        navigate(`/profile/${userId}`);
      })
      .catch(err => {
        console.error('Error updating profile:', err);
        alert('Error updating profile');
      });
  };

  return (
    <div className='editprofile'>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit} className='editprofile-form'>
        <div className='editprofile-content'>
          <div className='editprofile-box'>

            <div className='editprofile-box-input'>
              <img
                src={imagePreview}
                alt='Profile'
                className='edit-profile-photo'
                style={{
                  width: '275px',
                  height: '275px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            </div>
          
            <div className='editprofile-box-input-photo'>
              <FormLabel>Change Picture:</FormLabel>
              <input
                type='file'
                name='photo'
                accept='image/*'
                className='editprofile-photo-button'
                onChange={handleFileChange}
              />
            </div>
            <Box
              sx={{
                width: 300,
                maxWidth: '100%',
              }}
            >
              <div className='editprofile-box-input'>
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

              <div className='editprofile-box-input'>
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

              <div className='editprofile-box-input'>
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
            </Box>
            <div className='editprofile-box-input'>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 300 }}
              >
                <InputLabel
                  id="demo-simple-select-standard-label"
                  color="secondary"
                >
                  Preferred Class:
                </InputLabel>
                <Select
                  name='classType'
                  value={formData.classType}
                  onChange={handleChange}
                  color="secondary"
                >
                  <MenuItem value="">Select a class type</MenuItem>
                  <MenuItem value="Barbarian">Barbarian</MenuItem>
                  <MenuItem value="Bard">Bard</MenuItem>
                  <MenuItem value="Cleric">Cleric</MenuItem>
                  <MenuItem value="Druid">Druid</MenuItem>
                  <MenuItem value="Fighter">Fighter</MenuItem>
                  <MenuItem value="Monk">Monk</MenuItem>
                  <MenuItem value="Multiclass">Multiclass</MenuItem>
                  <MenuItem value="Paladin">Paladin</MenuItem>
                  <MenuItem value="Ranger">Ranger</MenuItem>
                  <MenuItem value="Rogue">Rogue</MenuItem>
                  <MenuItem value="Sorcerer">Sorcerer</MenuItem>
                  <MenuItem value="Warlock">Warlock</MenuItem>
                  <MenuItem value="Wizard">Wizard</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className='editprofile-box-input'>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    name='isDM'
                    value='true'
                    checked={formData.isDM === true}
                    onChange={handleChange}
                    control={<Radio color="secondary" />}
                    label="DM"
                  />
                  <FormControlLabel
                    name='isDM'
                    value='false'
                    checked={formData.isDM === false}
                    onChange={handleChange}
                    control={<Radio color="secondary" />}
                    label="Player"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div className='editprofile-box-input'>
              <Box
                sx={{
                  '& .MuiTextField-root': { m: 1, width: 400 },
                }}
              >
                <TextField fullWidth
                  name='bio'
                  value={formData.bio}
                  onChange={handleChange}
                  variant="outlined"
                  label="Bio"
                  color="secondary"
                  multiline
                  placeholder='Brave adventurer, tell us about yourself and the character you are, or are hoping to play!'
                  className='custom-textfield'
                />
              </Box>
            </div>

            <button type='submit' className='editprofile-button'>Update Profile</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;