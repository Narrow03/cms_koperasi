import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Cms.css';

const BeritaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
    judul: '', slug: '', deskripsiSingkat: '', konten: '', urlGambar: '', tanggalBerita: ''
  });

  const createAuthHeader = () => ({
    'Authorization': 'Basic ' + btoa('admin:password123'),
    'Content-Type': 'application/json',
  });

  useEffect(() => {
    if (isEditMode) {
      fetch(`http://localhost:8080/api/berita/${id}`, { headers: {'Authorization': 'Basic ' + btoa('admin:password123')} })
        .then(res => res.json())
        .then(data => setFormData(data));
    }
  }, [id, isEditMode]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const url = isEditMode ? `http://localhost:8080/api/berita/${id}` : 'http://localhost:8080/api/berita';
    const method = isEditMode ? 'PUT' : 'POST';

    fetch(url, { method, headers: createAuthHeader(), body: JSON.stringify(formData) })
      .then(res => {
        if (res.ok) {
          alert('Berita berhasil disimpan!');
          navigate('/berita');
        } else {
          alert('Gagal menyimpan berita.');
        }
      });
  };

  return (
    <div className="cms-page">
      <h2>{isEditMode ? 'Edit' : 'Tambah'} Berita</h2>
      <form onSubmit={handleSubmit} className="cms-form">
        <label>Judul</label><input type="text" name="judul" value={formData.judul} onChange={handleChange} required />
        <label>Slug</label><input type="text" name="slug" value={formData.slug} onChange={handleChange} required />
        <label>URL Gambar</label><input type="text" name="urlGambar" value={formData.urlGambar} onChange={handleChange} required />
        <label>Tanggal</label><input type="date" name="tanggalBerita" value={formData.tanggalBerita} onChange={handleChange} required />
        <label>Deskripsi Singkat</label><textarea name="deskripsiSingkat" value={formData.deskripsiSingkat} onChange={handleChange} rows="3" />
        <label>Konten Lengkap (pisahkan paragraf dengan Enter)</label><textarea name="konten" value={formData.konten} onChange={handleChange} rows="10" required />
        <button type="submit" className="cms-button">{isEditMode ? 'Update' : 'Simpan'}</button>
      </form>
    </div>
  );
};

export default BeritaForm;