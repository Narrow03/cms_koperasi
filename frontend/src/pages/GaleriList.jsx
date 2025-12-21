import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Cms.css';

const GaleriList = () => {
  const [galeri, setGaleri] = useState([]);
  const createAuthHeader = () => {
    // 1. Ambil token TEPAT saat fungsi ini dipanggil
    const token = localStorage.getItem('auth_token'); 
    
    return {
        'Authorization': token,
        'Content-Type': 'application/json'
    };
};

  useEffect(() => {
    fetch('http://localhost:8080/api/galeri', { headers: createAuthHeader() })
      .then(res => res.json())
      .then(data => setGaleri(data));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus item galeri ini?')) {
      fetch(`http://localhost:8080/api/galeri/${id}`, { method: 'DELETE', headers: createAuthHeader() })
        .then(res => { if (res.ok) setGaleri(galeri.filter(g => g.id !== id)) });
    }
  };

  return (
    <div className="cms-page">
      <div className="page-header">
        <h2>Daftar Galeri Kegiatan</h2>
        <Link to="/galeri/baru" className="cms-button">Tambah Galeri Baru</Link>
      </div>
      <table className="cms-table">
        <thead><tr><th>ID</th><th>Judul</th><th>Jumlah Gambar</th><th>Aksi</th></tr></thead>
        <tbody>
          {galeri.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.judul}</td>
              <td>{item.daftarGambar.length}</td>
              <td>
                <Link to={`/galeri/edit/${item.id}`} className="cms-button edit">Edit</Link>
                <button onClick={() => handleDelete(item.id)} className="cms-button delete">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GaleriList;