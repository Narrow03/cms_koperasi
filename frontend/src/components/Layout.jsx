import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import '../Cms.css';

const CmsLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="cms-layout">
      {/* Anda bisa tambahkan tombol logout di Navbar */}
      <Navbar onLogout={handleLogout} /> 
      <div className="cms-main-container">
        <Sidebar />
        <main className="cms-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CmsLayout;