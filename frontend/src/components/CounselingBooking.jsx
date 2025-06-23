import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './form.css';

function CounselingBooking() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post('/api/counseling', { name, email, date, reason });
      alert('Counseling session booked!');
      setName('');
      setEmail('');
      setDate('');
      setReason('');
      navigate('/dashboard');
    } catch (err) {
      alert('Error booking counseling session');
    }
  };

  const handleBack = () => {
    navigate('/dashboard'); // Adjust this if your actual route differs
  };

  return (
    <div className="form-box">
      <h2>Book a Counseling Session</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="date"
        placeholder="Preferred Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <textarea
        placeholder="Reason for Counseling"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit}>Book Session</button>

      <div className="back-to-dashboard" onClick={handleBack}>
        <span>&larr; Back to Dashboard</span>
      </div>
    </div>
  );
}

export default CounselingBooking;
