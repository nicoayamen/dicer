import React, { useState } from 'react';


const Login = () => {
  const [email, setEmail] = useState("");
  const [id, setid] = useState("");
  const [login, setLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, id);
    setLogin(true);
    setEmail('');
    setid('');
  };

  return (
    <div>

      <h1>Dicer</h1>

      {login ? <h2>Welcome!</h2> :
        (
          <form onSubmit={handleSubmit}>
            <div className=''>
              <input
                type='text'
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>
            <div className=''>
              <input
                type='text'
                placeholder='password'
                value={id}
                onChange={(e) => setid(e.target.value)}
                required />
            </div>

            <button>Login</button>

            <div className=''>
              <p>Don't have an account? <a href='#'>Sign Up!</a></p>
            </div>
          </form>
        )}

    </div>
  );
};

export default Login;