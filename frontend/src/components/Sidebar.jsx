import React from "react";
import { NavLink } from "react-router-dom";
import "../Cms.css";

const Sidebar = () => {
  return (
    <aside className="cms-sidebar">
      <h2>Menu</h2>
      <ul>
        <li>
          <NavLink to="/simpanan">Produk Simpanan</NavLink>
        </li>
        <li>
          <NavLink to="/pinjaman">Produk Pinjaman</NavLink>
        </li>
        <li>
          <NavLink to="/berita">Berita</NavLink>
        </li>
        <li>
          <NavLink to="/galeri">Galeri</NavLink>
        </li>
        <li>
          <NavLink to="/faq">FAQ</NavLink>
        </li>
        <li>
          <NavLink to="/pengaturan-kontak">Info Kontak</NavLink>
        </li>
        <li>
          <NavLink to="/karir">Karir</NavLink>
        </li>
        <li>
          <NavLink to="/lamaran">Lamaran Masuk</NavLink>
        </li>
        <li>
          <NavLink to="/pengurus">Struktur Manajemen</NavLink>
        </li>
        <li>
          <NavLink to="/testimonials">Testimonial</NavLink>
        </li>
        <li>
          <NavLink to="/pengaturan-statistik">Statistik</NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
