import React from 'react';
import { Link } from 'react-router-dom';

//Components
import Login from './Login';

const LoginPage = (props) => {
  const { email, setEmail, password, setPassword, error, setError, setLogin } = props;

  return (
    <div>
      <Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} setError={setError} setLogin={setLogin} />

      <div className='sign-up'>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;