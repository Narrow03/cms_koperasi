import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Cms.css';

const BeritaList = () => {
  const [berita, setBerita] = useState([]);
  const createAuthHeader = () => {
    // 1. Ambil token TEPAT saat fungsi ini dipanggil
    const token = localStorage.getItem('auth_token'); 
    
    return {
        'Authorization': token,
        'Content-Type': 'application/json'
    };
};
  useEffect(() => {
    fetch('http://localhost:8080/api/berita', { headers: createAuthHeader() })
      .then(res => res.json())
      .then(data => setBerita(data));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus berita ini?')) {
      fetch(`http://localhost:8080/api/berita/${id}`, { method: 'DELETE', headers: createAuthHeader() })
        .then(res => { if (res.ok) setBerita(berita.filter(b => b.id !== id)) });
    }
  };

  return (
    <div className="cms-page">
      <div className="page-header">
        <h2>Daftar Berita</h2>
        <Link to="/berita/baru" className="cms-button">Tambah Berita</Link>
      </div>
      <table className="cms-table">
        <thead><tr><th>ID</th><th>Judul</th><th>Tanggal</th><th>Aksi</th></tr></thead>
        <tbody>
          {berita.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td><td>{item.judul}</td><td>{item.tanggalBerita}</td>
              <td>
                <Link to={`/berita/edit/${item.id}`} className="cms-button edit">Edit</Link>
                <button onClick={() => handleDelete(item.id)} className="cms-button delete">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BeritaList;