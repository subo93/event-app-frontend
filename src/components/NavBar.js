// src/components/NavBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate('/dashboard')}>EventApp</div>
      <div className="user-icon" onClick={() => alert('User profile coming soon!')}>
        <img src="/profile-icon.png" alt="User" />
      </div>
    </nav>
  );
}
