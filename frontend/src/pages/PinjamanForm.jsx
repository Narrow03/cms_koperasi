import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Cms.css';

const PinjamanForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
    nama: '',
    slug: '',
    urlGambar: '',
    deskripsi: '',
    syarat: [],
    benefit: []
  });

  // Helper untuk header autentikasi
  const createAuthHeader = () => ({
    'Authorization': 'Basic ' + btoa('admin:password123'),
    'Content-Type': 'application/json',
  });

  // Mengambil data jika dalam mode edit
  useEffect(() => {
    if (isEditMode) {
      fetch(`http://localhost:8080/api/pinjaman/${id}`, { headers: {'Authorization': 'Basic ' + btoa('admin:password123')} })
        .then(res => res.json())
        .then(data => setFormData(data));
    }
  }, [id, isEditMode]);

  // Handler untuk input biasa
  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handler untuk input list dinamis (syarat/benefit)
  const handleListChange = (e, index, type) => {
    const newList = [...formData[type]];
    newList[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [type]: newList });
  };
  
  // Fungsi untuk menambah item ke list
  const addListItem = type => setFormData({ ...formData, [type]: [...formData[type], { deskripsi: '' }] });
  
  // Fungsi untuk menghapus item dari list
  const removeListItem = (index, type) => setFormData({ ...formData, [type]: formData[type].filter((_, i) => i !== index) });

  // Handler untuk submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEditMode ? `http://localhost:8080/api/pinjaman/${id}` : 'http://localhost:8080/api/pinjaman';
    const method = isEditMode ? 'PUT' : 'POST';

    fetch(url, { method, headers: createAuthHeader(), body: JSON.stringify(formData) })
      .then(response => {
        if (response.ok) {
          alert(`Produk Pinjaman berhasil ${isEditMode ? 'diperbarui' : 'disimpan'}!`);
          navigate('/pinjaman'); // Arahkan kembali ke halaman daftar
        } else {
          alert('Terjadi kesalahan saat menyimpan data.');
        }
      });
  };

  return (
    <div className="cms-page">
      <h2>{isEditMode ? 'Edit' : 'Tambah'} Produk Pinjaman</h2>
      <form onSubmit={handleSubmit} className="cms-form">
        <label>Nama Produk</label>
        <input type="text" name="nama" value={formData.nama} onChange={handleChange} required />
        
        <label>Slug</label>
        <input type="text" name="slug" value={formData.slug} onChange={handleChange} required />
        
        <label>URL Gambar</label>
        <input type="text" name="urlGambar" value={formData.urlGambar} onChange={handleChange} required />
        
        <label>Deskripsi</label>
        <textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange} rows="4" required />
        
        <fieldset><legend>Syarat</legend>
          {formData.syarat.map((item, index) => (
            <div key={index} className="dynamic-input">
              <input name="deskripsi" value={item.deskripsi} onChange={e => handleListChange(e, index, 'syarat')} placeholder={`Syarat #${index + 1}`} />
              <button type="button" onClick={() => removeListItem(index, 'syarat')}>Hapus</button>
            </div>
          ))}
          <button type="button" onClick={() => addListItem('syarat')}>Tambah Syarat</button>
        </fieldset>

        <fieldset><legend>Benefit</legend>
          {formData.benefit.map((item, index) => (
            <div key={index} className="dynamic-input">
              <input name="deskripsi" value={item.deskripsi} onChange={e => handleListChange(e, index, 'benefit')} placeholder={`Benefit #${index + 1}`} />
              <button type="button" onClick={() => removeListItem(index, 'benefit')}>Hapus</button>
            </div>
          ))}
          <button type="button" onClick={() => addListItem('benefit')}>Tambah Benefit</button>
        </fieldset>
        
        <button type="submit" className="cms-button">{isEditMode ? 'Perbarui Data' : 'Simpan Data'}</button>
      </form>
    </div>
  );
};

export default PinjamanForm;