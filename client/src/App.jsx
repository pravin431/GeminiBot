// src/App.jsx
import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import './App.css'; // Optional: Add basic styling if needed

function App() {
  const { token } = useContext(AuthContext);

  if (!token) {
    return (
      <div className="auth-container">
        <h1>Welcome to Gemini Bot</h1>
        <Login />
        <Register />
      </div>
    );
  }

  return (
    <div className="app">
      <Sidebar />
      <Main />
    </div>
  );
}

export default App;