import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Cms.css';

const FaqList = () => {
  const [faqs, setFaqs] = useState([]);
  const createAuthHeader = () => {
    // 1. Ambil token TEPAT saat fungsi ini dipanggil
    const token = localStorage.getItem('auth_token'); 
    
    return {
        'Authorization': token,
        'Content-Type': 'application/json'
    };
};

  useEffect(() => {
    fetch('http://localhost:8080/api/faq', { headers: createAuthHeader() })
      .then(res => res.json())
      .then(data => setFaqs(data));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus FAQ ini?')) {
      fetch(`http://localhost:8080/api/faq/${id}`, { method: 'DELETE', headers: createAuthHeader() })
        .then(res => { if (res.ok) setFaqs(faqs.filter(f => f.id !== id)) });
    }
  };

  return (
    <div className="cms-page">
      <div className="page-header">
        <h2>Daftar FAQ</h2>
        <Link to="/faq/baru" className="cms-button">Tambah FAQ</Link>
      </div>
      <table className="cms-table">
        <thead><tr><th>ID</th><th>Pertanyaan</th><th>Aksi</th></tr></thead>
        <tbody>
          {faqs.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.question}</td>
              <td>
                <Link to={`/faq/edit/${item.id}`} className="cms-button edit">Edit</Link>
                <button onClick={() => handleDelete(item.id)} className="cms-button delete">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FaqList;