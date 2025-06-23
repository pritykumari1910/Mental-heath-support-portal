import React, { useState } from 'react';
import axios from 'axios';
import './chatbot.css';
import { marked } from 'marked';

function Chatbot() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) {
      alert('Please type a message.');
      return;
    }

    setLoading(true);
    setReply('');
    try {
      const res = await axios.post('http://localhost:5000/api/chatbot', { message });
      setReply(res.data.reply);
    } catch (err) {
      console.error('Chatbot error:', err);
      setReply('Error contacting chatbot. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="chatbot-box">
      <h3>Chat-Now ✨</h3>

      <textarea
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="button-group">
        <button onClick={handleSend} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
        <button className="back-button" onClick={handleBack}>
          ⬅ Back to Dashboard
        </button>
      </div>

      <div className="chatbot-reply">
        {loading && <p className="typing-indicator">Gemini is typing<span className="dots">...</span></p>}
        {!loading && reply && (
          <div dangerouslySetInnerHTML={{ __html: marked.parse(reply) }} />
        )}
      </div>
    </div>
  );
}

export default Chatbot;
