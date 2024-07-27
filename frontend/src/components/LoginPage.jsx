import React from 'react';
import { Link } from 'react-router-dom';

//Components
import Login from './Login';

const LoginPage = (props) => {
  const { login, loggedIn, email, setEmail, password, setPassword, error, setError } = props;

  return (
    <div>
      <Login login={login} loggedIn={loggedIn} email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} setError={setError}/>

      <div className='sign-up'>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;