import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Cms.css';

const PinjamanList = () => {
  const [pinjaman, setPinjaman] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper untuk membuat header autentikasi
  const createAuthHeader = () => ({
    'Authorization': 'Basic ' + btoa('admin:password123'),
  });

  // Mengambil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetch('http://localhost:8080/api/pinjaman', { headers: createAuthHeader() })
      .then(response => {
        if (!response.ok) {
          throw new Error('Gagal mengambil data, pastikan kredensial benar.');
        }
        return response.json();
      })
      .then(data => {
        setPinjaman(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Fungsi untuk menangani penghapusan
  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk pinjaman ini?')) {
      fetch(`http://localhost:8080/api/pinjaman/${id}`, {
        method: 'DELETE',
        headers: createAuthHeader(),
      })
      .then(response => {
        if (response.ok) {
          setPinjaman(pinjaman.filter(item => item.id !== id));
          alert('Produk berhasil dihapus!');
        } else {
          alert('Gagal menghapus produk.');
        }
      });
    }
  };

  if (loading) return <p>Memuat data pinjaman...</p>;

  return (
    <div className="cms-page">
      <div className="page-header">
        <h2>Daftar Produk Pinjaman</h2>
        <Link to="/pinjaman/baru" className="cms-button">Tambah Produk Baru</Link>
      </div>
      <table className="cms-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Slug</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pinjaman.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nama}</td>
              <td>{item.slug}</td>
              <td>
                <Link to={`/pinjaman/edit/${item.id}`} className="cms-button edit">Edit</Link>
                <button onClick={() => handleDelete(item.id)} className="cms-button delete">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PinjamanList;