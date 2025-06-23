import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './form.css';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await axios.post('/api/auth/register', form);
      alert('Registered successfully! Now login.');
      navigate('/login'); // redirect to login page
    } catch {
      alert('Registration failed');
    }
  };

    const handleLoginRedirect = () => {
    navigate('/login'); // redirect to login page
  };

  return (
    <div className="form-box">
      <h2>Register</h2>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button onClick={handleSubmit}>Register</button>
      
      <p className="login-redirect">
  <span>Already have an account? </span>
  <span className="link-button" onClick={handleLoginRedirect}>Login</span>
</p>

    </div>
  );
}

export default Register;
