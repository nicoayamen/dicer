import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            </div>

            <div className='editprofile-box-input'>
              <label>Change Picture: </label>
              <input
                type='file'
                name='photo'
                accept='image/*'
                className='editprofile-photo-button'
                onChange={handleFileChange}
              />
            </div>

            <div className='editprofile-box-input'>
              <label>First Name: </label>
              <input
                type='text'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className='editprofile-box-input'>
              <label>Last Name: </label>
              <input
                type='text'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className='editprofile-box-input'>
              <label>Email: </label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className='editprofile-box-input'>
              <label>Preferred Class: </label>
              <select
                name='classType'
                value={formData.classType}
                onChange={handleChange}
              >
                <option value="">Select a class type</option>
                <option value="Barbarian">Barbarian</option>
                <option value="Bard">Bard</option>
                <option value="Cleric">Cleric</option>
                <option value="Druid">Druid</option>
                <option value="Fighter">Fighter</option>
                <option value="Monk">Monk</option>
                <option value="Multiclass">Multiclass</option>
                <option value="Paladin">Paladin</option>
                <option value="Ranger">Ranger</option>
                <option value="Rogue">Rogue</option>
                <option value="Sorcerer">Sorcerer</option>
                <option value="Warlock">Warlock</option>
                <option value="Wizard">Wizard</option>
              </select>
            </div>

            <div className='editprofile-box-input'>
              <label>Role: </label>
              <label>
                <input
                  type='radio'
                  name='isDM'
                  value='true'
                  checked={formData.isDM === true}
                  onChange={handleChange}
                />
                DM
              </label>
              <label>
                <input
                  type='radio'
                  name='isDM'
                  value='false'
                  checked={formData.isDM === false}
                  onChange={handleChange}
                />
                Player
              </label>
            </div>

            <div className='editprofile-box-input'>
              <label>Bio: </label>
            </div>
            <div className='editprofile-box-input'>
              <textarea
                name='bio'
                value={formData.bio}
                onChange={handleChange}
                style={{ width: '500px', height: '150px' }}
              />
            </div>

            <button type='submit' className='editprofile-button'>Update Profile</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;