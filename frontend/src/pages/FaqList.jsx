import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import '../Cms.css';

const FaqList = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  const createAuthHeader = () => {
    const token = localStorage.getItem('auth_token'); 
    return {
        'Authorization': token,
        'Content-Type': 'application/json'
    };
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/faq', { headers: createAuthHeader() })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data FAQ.");
        return res.json();
      })
      .then((data) => {
        setFaqs(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus FAQ ini?')) {
      fetch(`http://localhost:8080/api/faq/${id}`, { 
        method: 'DELETE', 
        headers: createAuthHeader() 
      })
        .then((res) => { 
          if (res.ok) {
            setFaqs(faqs.filter(f => f.id !== id));
            toast.success("FAQ berhasil dihapus!");
          } else {
            toast.error("Gagal menghapus FAQ.");
          }
        })
        .catch(() => {
          toast.error("Terjadi kesalahan koneksi saat menghapus.");
        });
    }
  };

  if (loading) return <p className="loading-text">Memuat data FAQ...</p>;

  return (
    <div className="cms-page">
      <div className="page-header">
        <h2>Daftar FAQ</h2>
        <Link to="/faq/baru" className="cms-button">Tambah FAQ</Link>
      </div>
      <table className="cms-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Pertanyaan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {faqs.length > 0 ? (
            faqs.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.question}</td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/faq/edit/${item.id}`} className="cms-button edit">Edit</Link>
                    <button onClick={() => handleDelete(item.id)} className="cms-button delete">Hapus</button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                Tidak ada data FAQ.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FaqList;