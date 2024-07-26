import './App.css';
import { useState } from 'react';

//Components
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  //Handle login state
  const loggedIn = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const body = { email, password };
      console.log(body);
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      setpassword('');

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="App">      
      < Login login={login} loggedIn={loggedIn} email={email} setEmail={setEmail} password={password} setpassword={setpassword} />

    </div>
  );
}

export default App;
