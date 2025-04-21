import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { email, password });
      alert(res.data.message);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
      {/* Stack inputs vertically */}
      <div style={{
        display: 'flex',
        flexDirection: 'column', // vertical layout
        gap: '15px',
        maxWidth: '300px',
        margin: '0 auto',
        marginBottom: '10px'
      }}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
