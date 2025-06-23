import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './form.css';

function MoodTracker() {
  const [mood, setMood] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setMood(e.target.value);

  const handleSubmit = async () => {
    try {
      await axios.post('/api/mood', { mood });
      alert('Mood recorded successfully!');
      setMood('');
      navigate('/dashboard');
    } catch (err) {
      alert('Error recording mood');
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="form-box">
      <h2>How are you feeling today?</h2>
      <select value={mood} onChange={handleChange}>
        <option value="">Select your mood</option>
        <option value="Happy">😊 Happy</option>
        <option value="Sad">😢 Sad</option>
        <option value="Anxious">😟 Anxious</option>
        <option value="Excited">🤩 Excited</option>
        <option value="Tired">😴 Tired</option>
        <option value="Angry">😠 Angry</option>
      </select>
      <button onClick={handleSubmit}>Save Mood</button>

      <div className="back-to-dashboard" onClick={handleBack}>
        <span>&larr; Back to Dashboard</span>
      </div>
    </div>
  );
}

export default MoodTracker;
