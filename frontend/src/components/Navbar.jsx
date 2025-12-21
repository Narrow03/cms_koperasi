import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Pastikan path import ini benar
import '../Cms.css';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Panggil fungsi logout dari context (hapus token)
    logout();
    // 2. Arahkan paksa ke halaman login
    navigate('/login');
  };

  return (
    <nav className="cms-navbar">
      <h1>CMS Koperasi</h1>
      <button onClick={handleLogout} className="logout-button">
        Keluar
      </button>
    </nav>
  );
};

export default Navbar;