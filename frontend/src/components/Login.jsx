import React, { useState } from 'react';


const Login = () => {
  const [email, setEmail] = useState("");
  const [id, setid] = useState("");
  const [login, setLogin] = useState(false);
  //const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, id);

    try {
      const body = { email, id };
      console.log(body);
      const response = await fetch('/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      console.log(data);
      setLogin(true);
      setEmail('');
      setid('');
      
    } catch (err) {
      console.error(err.message);
    }
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