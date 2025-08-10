import React, { useState } from 'react';
import Login from './Login';
import Logs from './Logs';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleSetToken = t => {
    setToken(t);
    localStorage.setItem('token', t);
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <div style={{maxWidth: 600, margin: 'auto'}}>
      {!token ? (
        <Login setToken={handleSetToken} />
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <Logs token={token} />
        </>
      )}
    </div>
  );
}

export default App;