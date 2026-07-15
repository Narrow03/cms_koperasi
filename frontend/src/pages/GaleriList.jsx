import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify"; // Import toast
import '../Cms.css';

const GaleriList = () => {
  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(true); // Tambahkan state loading

  const createAuthHeader = () => {
    const token = localStorage.getItem('auth_token'); 
    return {
        'Authorization': token,
        'Content-Type': 'application/json'
    };
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/galeri', { headers: createAuthHeader() })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data, pastikan kredensial benar.");
        }
        return response.json();
      })
      .then((data) => {
        setGaleri(data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message); // Gunakan toast
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus item galeri ini?')) {
      fetch(`http://localhost:8080/api/galeri/${id}`, { 
        method: 'DELETE', 
        headers: createAuthHeader() 
      })
      .then(response => { 
        if (response.ok) {
          setGaleri(galeri.filter(g => g.id !== id));
          toast.success("Galeri berhasil dihapus!"); 
        } else {
          toast.error("Gagal menghapus galeri.");
        }
      })
      .catch(() => {
        toast.error("Terjadi kesalahan koneksi saat menghapus.");
      });
    }
  };

  if (loading) return <p className="loading-text">Memuat data galeri...</p>;

  return (
    <div className="cms-page">
      <div className="page-header">
        <h2>Daftar Galeri Kegiatan</h2>
        <Link to="/galeri/baru" className="cms-button">
          Tambah Galeri Baru
        </Link>
      </div>
      <table className="cms-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Judul</th>
            <th>Jumlah Gambar</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {galeri.length > 0 ? (
            galeri.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.judul}</td>
                <td>{item.daftarGambar ? item.daftarGambar.length : 0}</td>
                <td>
                  <div className="action-buttons">
                    <Link 
                      to={`/galeri/edit/${item.id}`} 
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
                Tidak ada data galeri.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GaleriList;