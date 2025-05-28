// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      // Optionally, fetch user details with the token if your backend supports it

    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://gemini-bot-server.vercel.app/api/auth/login', { email, password });
      const { token } = response.data;
      setToken(token);
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post('https://gemini-bot-server.vercel.app/api/auth/register', { username, email, password });
      console.log('Registration successful:', response.data);

      alert('Registration successful! Please log in.');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};