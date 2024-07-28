import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

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
          classType: role.class || '',
          isDM: role.is_dm || false,
          bio: role.bio || '',
          photo: null
        });
      })
      .catch(err => {
        console.error('Error fetching profile data:', err);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'radio' ? value === 'true' : value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0]
    });
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
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <img 
            src={profile.photo ? `/${profile.photo}` : 'http://placehold.it/150x150'} 
            alt="Profile" 
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
          <label>
            Change Picture:
            <input 
              type="file" 
              name="photo" 
              accept="image/*"
              onChange={handleFileChange} 
            />
          </label>
        </div>
        <div>
          <label>
            First Name:
            <input 
              type="text" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input 
              type="text" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
            />
          </label>
        </div>
        <div>
          <label>
            Preferred Class:
            <select 
              name="classType" 
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
          </label>
        </div>
        <div>
          <label>
            <input 
              type="radio" 
              name="isDM" 
              value="true" 
              checked={formData.isDM === true} 
              onChange={handleChange}
            />
            DM
          </label>
          <label>
            <input 
              type="radio" 
              name="isDM" 
              value="false" 
              checked={formData.isDM === false} 
              onChange={handleChange}
            />
            Player
          </label>
        </div>
        <div>
          <label>
            Bio:
            <textarea 
              name="bio" 
              value={formData.bio} 
              onChange={handleChange} 
              rows="4"
            />
          </label>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
