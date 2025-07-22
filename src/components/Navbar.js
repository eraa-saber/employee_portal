import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import combinedLogo from '../images/Group 131.png';
import egyptFlag from '../images/egypt.svg';

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <nav className="navbar" dir="rtl">
      <div className="navbar-left">
        <img src={combinedLogo} alt="Logos" className="logo" />
      </div>
      <div className="navbar-center">
        <div className="navbar-links">
          <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>الرئيسية</NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>الصفحة الشخصية</NavLink>
          <NavLink to="/requests" className={({ isActive }) => (isActive ? 'active' : '')}>طلباتي</NavLink>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-actions">
          <div className="language-selector">
            <span>اللغة العربية</span>
            <img src={egyptFlag} alt="Egypt Flag" />
          </div>
          <button className="logout-btn" onClick={handleLogout}>تسجيل الخروج</button>
        </div>
      </div>
    </nav>
  );
} 