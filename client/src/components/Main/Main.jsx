// src/components/Main/Main.jsx
import React, { useState, useEffect, useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Main = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { token } = useContext(AuthContext);

  // Fetch chat history on mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/chat/history', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
      }
    };
    if (token) {
      fetchHistory();
    }
  }, [token]);

  // Handle sending a message
  const handleSend = async () => {
    if (!input.trim()) return;
    try {
      const response = await axios.post(
        'http://localhost:5000/api/chat/message',
        { message: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const newMessage = { role: 'user', content: input };
      const botResponse = { role: 'bot', content: response.data.botMessage };
      setMessages([...messages, newMessage, botResponse]);
      setInput('');
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user-icon" />
      </div>

      <div className="main-container">
        {/* Chat History */}
        <div className="chat-history">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <p>{msg.content}</p>
              </div>
            ))
          ) : (
            <div className="greet">
              <p><span>Hello, Dev</span></p>
              <p>How can I help you today?</p>
            </div>
          )}
        </div>

        {/* Show cards only if no messages */}
        {messages.length === 0 && (
          <div className="cards">
            <div className="card">
              <p>Suggest beautiful places to see on an upcoming road trip</p>
              <img src={assets.compass_icon} alt="compass-icon" />
            </div>
            <div className="card">
              <p>Briefly summarize this concept: urban planning</p>
              <img src={assets.bulb_icon} alt="bulb-icon" />
            </div>
            <div className="card">
              <p>Brainstorm team bonding activities for our work retreat</p>
              <img src={assets.message_icon} alt="message-icon" />
            </div>
            <div className="card">
              <p>Refactor the following code</p>
              <img src={assets.code_icon} alt="code-icon" />
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery-icon" />
              <img src={assets.mic_icon} alt="mic-icon" />
              <img src={assets.send_icon} alt="send-icon" onClick={handleSend} />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
