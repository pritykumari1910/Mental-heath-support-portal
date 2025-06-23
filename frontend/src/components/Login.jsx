import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
     const data = await res.json();
        if (res.status === 200) {
            localStorage.setItem('token', data.token);  // Store token in local storage
            localStorage.setItem('userId', data.userId);  // Store userId in local storage
            alert('Login successful!');
        } else {
            alert(data.error);
        }
  
      if (res.ok) {
        navigate(`/dashboard/${data.userId}`);
      } else {
        alert(data.error);
      }
      
    } catch (err) {
      alert('Error logging in');
      console.error(err);
    }
  };
  
  return (
    <div className="form-box">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      
      {/* Register redirect */}
      <p className="redirect-text">
        Don't have an account?{' '}
        <span className="link-text" onClick={() => navigate('/register')}>
          Register
        </span>
      </p>
    </div>
  );
}

export default Login;
