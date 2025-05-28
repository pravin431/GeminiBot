// src/components/Sidebar/Sidebar.jsx
import React, { useState, useEffect, useContext } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const [expand, setExpand] = useState(false);
  const [recentMessages, setRecentMessages] = useState([]);
  const { token, logout } = useContext(AuthContext);

  // Fetch chat history for recent messages
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/chat/history', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userMessages = response.data.filter((msg) => msg.role === 'user');
        setRecentMessages(userMessages);
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
      }
    };
    if (token) {
      fetchHistory();
    }
  }, [token]);

  return (
    <div
      className={`sidebar ${expand ? 'expanded' : ''}`}
      onMouseEnter={() => setExpand(true)}
      onMouseLeave={() => setExpand(false)}
    >
      <div className="top">
        <img
          className="menu"
          onClick={() => setExpand(!expand)}
          src={assets.menu_icon}
          alt="menu-icon"
        />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="plus-icon" />
          <p>New Chat</p>
        </div>

        <div className="recent">
          <p className="recent-title">Recent</p>
          {recentMessages.length > 0 ? (
            recentMessages.map((msg, index) => (
              <div key={index} className="recent-entry">
                <img src={assets.message_icon} alt="message-icon" />
                <p>{msg.content.substring(0, 20)}...</p>
              </div>
            ))
          ) : (
            <div className="recent-entry">
              <img src={assets.message_icon} alt="message-icon" />
              <p>No recent chats</p>
            </div>
          )}
        </div>
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="question-icon" />
          <p>Help</p>
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="history-icon" />
          <p>Activity</p>
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="settings-icon" />
          <p>Settings</p>
        </div>
        <div className="bottom-item recent-entry" onClick={logout}>
          <img src={assets.logout_icon} alt="logout-icon" />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
