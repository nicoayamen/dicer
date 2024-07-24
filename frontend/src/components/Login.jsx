import React, { useState } from 'react';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [login, setLogin] = useState(false);

  return (
    <div>
      <h1>Dicer</h1>
      <form>
        <div className=''>
          <input
            type='text'
            placeholder='email'
            value={email}
            onChange={ (e) => setEmail(e.target.value)}
            required />
        </div>
        <div className=''>
          <input
            type='text'
            placeholder='password'
            value={password}
            onChange={ (e) => setPassword(e.target.value)}
            required />
        </div>

        <button>Login</button>

        <div className=''>
          <p>Don't have an account? <a href='#'>Sign Up!</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;