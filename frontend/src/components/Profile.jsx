import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div>
      <h2>Profile</h2>
      <Link to="/matches">Matches</Link>
    </div>
  );
};

export default Profile;