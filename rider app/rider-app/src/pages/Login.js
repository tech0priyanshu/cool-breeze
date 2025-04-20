// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/rider/login', { email });
      localStorage.setItem('riderToken', res.data.token);
      localStorage.setItem('riderId', res.data.riderId);
      navigate('/orders');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-2xl font-bold mb-4">Rider Login</h2>
      <input
        type="email"
        value={email}
        placeholder="Enter rider email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-64 mb-4"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
        Login
      </button>
    </div>
  );
}

export default Login;
