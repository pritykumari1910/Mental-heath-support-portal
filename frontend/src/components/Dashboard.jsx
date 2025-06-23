import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './dashboard.css';  // Link to the external CSS


function Dashboard() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleChatbotClick = () => {
    // Trigger chatbot integration logic here
    alert("Chatbot initiated! How can I assist you?");
  };

  const handleSOSClick = () => {
    // Trigger SOS emergency help logic here (like opening a phone dialer or sending an emergency alert)
    alert("SOS activated! Emergency services are on the way.");
  };

  return (
    <div className="dashboard-banner">
      <h1>Welcome to Your Mental Health Dashboard 🧠</h1>
      <p>Take a moment for yourself — journal your thoughts, track your mood, or book time with a counselor.</p>

      <div className="dashboard-buttons">
        <div className="dashboard-card">
          <img src="https://img.icons8.com/fluency/64/journal.png" alt="Journal Icon" className="dashboard-card-img" />
          <h4>Personal Journal</h4>
          <p>Write down your thoughts and experiences to reflect and grow.</p>
          <button onClick={() => navigate(`/journal/${userId}`)} className="dashboard-btn">Journal</button>
        </div>

        <div className="dashboard-card">
          <img src="https://img.icons8.com/fluency/64/happy.png" alt="Mood Tracker Icon" className="dashboard-card-img" />
          <h4>Mood Tracker</h4>
          <p>Track your emotions daily and discover patterns in your mental health.</p>
          <button onClick={() => navigate(`/mood/${userId}`)} className="dashboard-btn">Mood Tracker</button>
        </div>

        <div className="dashboard-card">
          <img src="https://img.icons8.com/?size=160&id=oWcCUmGqdHMK&format=png" alt="Counseling Icon" className="dashboard-card-img" />
          <h4>Counseling</h4>
          <p>Book a session with a certified counselor to talk about what matters.</p>
          <button onClick={() => navigate(`/counseling/${userId}`)} className="dashboard-btn">Book Counseling</button>
        </div>

        <div className="dashboard-card">
          <img src="https://img.icons8.com/fluency/64/comments.png" alt="Forum Icon" className="dashboard-card-img" />
          <h4>Community Forum</h4>
          <p>Connect anonymously with others, share stories, and find support.</p>
          <button onClick={() => navigate(`/forum`)} className="dashboard-btn">Forum</button>
        </div>

        <div className="dashboard-card">
          <img src="https://img.icons8.com/fluency/64/logout-rounded-left.png" alt="Logout Icon" className="dashboard-card-img" />
          <h4>Logout</h4>
          <p>Come back whenever you need. Your journey is always waiting.</p>
          <button onClick={() => navigate('/')} className="dashboard-btn logout-btn">Logout</button>
        </div>

        {/* Chatbot and SOS buttons */}
        <div className="dashboard-card">
          <img src="https://img.icons8.com/fluency/64/chat.png" alt="Chatbot Icon" className="dashboard-card-img" />
          <h4>Chat with a Bot</h4>
          <p>Need some help? Chat with our bot anytime.</p>
          <button onClick={()=>navigate('/chatbot')}className="dashboard-btn">Chat Now</button>
        </div>

        <div className="dashboard-card">
          <img src="https://img.icons8.com/fluency/64/phone.png" alt="SOS Icon" className="dashboard-card-img" />
          <h4>SOS Emergency</h4>
          <p>If you're in immediate need of help, click here.</p>
          <button onClick={handleSOSClick} className="dashboard-btn sos-btn">SOS</button>
        </div>

      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        &copy; {new Date().getFullYear()} Mental Health Support Portal | All rights reserved
      </footer>
    </div>
  );
}

export default Dashboard;
