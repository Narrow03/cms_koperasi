import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify"; // Import toast
import '../Cms.css';

const BeritaList = () => {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true); // Tambahkan state loading

  const createAuthHeader = () => {
    const token = localStorage.getItem('auth_token');  
    return {
        'Authorization': token,
        'Content-Type': 'application/json'
    };
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/berita', { headers: createAuthHeader() })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data, pastikan kredensial benar.");
        }
        return response.json();
      })
      .then((data) => {
        setBerita(data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message); // Gunakan toast
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus berita ini?')) {
      fetch(`http://localhost:8080/api/berita/${id}`, { 
        method: 'DELETE', 
        headers: createAuthHeader() 
      })
      .then((response) => { 
        if (response.ok) {
          setBerita(berita.filter(b => b.id !== id));
          toast.success("Berita berhasil dihapus!");
        } else {
          toast.error("Gagal menghapus berita.");
        }
      })
      .catch(() => {
        toast.error("Terjadi kesalahan koneksi saat menghapus.");
      });
    }
  };

  if (loading) return <p className="loading-text">Memuat data berita...</p>;

  return (
    <div className="cms-page">
      <div className="page-header">
        <h2>Daftar Berita</h2>
        <Link to="/berita/baru" className="cms-button">
          Tambah Berita
        </Link>
      </div>
      <table className="cms-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Judul</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {berita.length > 0 ? (
            berita.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.judul}</td>
                <td>{item.tanggalBerita}</td>
                <td>
                  <div className="action-buttons">
                    <Link 
                      to={`/berita/edit/${item.id}`} 
                      className="cms-button edit"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className="cms-button delete"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Tidak ada data berita.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BeritaList;