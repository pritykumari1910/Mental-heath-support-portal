import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './journal.css'; // Link to the external CSS

function Journal() {
  const [entry, setEntry] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setEntry(e.target.value);

  const handleSubmit = async () => {
    try {
      await axios.post('/api/journal', { entry });
      alert('Journal entry saved!');
      setEntry('');
      console.log("Redirecting to /dashboard");
      navigate('/dashboard'); // Adjust this if your actual route differs
    } catch (err) {
      alert('Error saving journal entry');
    }
  };

  const handleBack = () => {
    console.log("Back button clicked - navigating to /dashboard");
    navigate('//dashboard'); // Adjust this if needed
  };

  return (
    <div className="form-box">
      <h2>Write Your Journal</h2>
      <textarea
        placeholder="Write your journal..."
        value={entry}
        onChange={handleChange}
      ></textarea>
      <button onClick={handleSubmit}>Save Journal</button>

      <div className="back-to-dashboard" onClick={handleBack}>
        <span>&larr; Back to Dashboard</span>
      </div>
    </div>
  );
}

export default Journal;
