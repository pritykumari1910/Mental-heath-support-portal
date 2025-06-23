import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Journal from './components/Journal';
import MoodTracker from './components/MoodTracker';
import CounselingBooking from './components/CounselingBooking';
import ChatbotModel from './components/ChatbotModel';
import Forum from './components/Forum';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes after login */}

      
      <Route path="/journal/:userId" element={<Journal />} />
      <Route path="/dashboard/:userId" element={<Dashboard />} />
      
   
      <Route path="/mood/:userId" element={<MoodTracker />} />
      <Route path="/counseling/:userId" element={<CounselingBooking />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/chatbot" element={<ChatbotModel />} />


      {/* Fallback */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
