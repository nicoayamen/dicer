import React from 'react';
import { Link } from 'react-router-dom';

//Components
import Login from './Login';

const LoginPage = (props) => {
  const { loggedIn, email, setEmail, password, setPassword, error } = props;

  return (
    <div>
      <Login loggedIn={loggedIn} email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} />

      <div className='sign-up'>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;