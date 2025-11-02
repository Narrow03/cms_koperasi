import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Cms.css';

const GaleriForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
    judul: '', deskripsi: '', daftarGambar: []
  });

  const createAuthHeader = () => ({
    'Authorization': 'Basic ' + btoa('admin:password123'),
    'Content-Type': 'application/json',
  });

  useEffect(() => {
    if (isEditMode) {
      fetch(`http://localhost:8080/api/galeri/${id}`, { headers: {'Authorization': 'Basic ' + btoa('admin:password123')} })
        .then(res => res.json())
        .then(data => setFormData(data));
    }
  }, [id, isEditMode]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleImageChange = (e, index) => {
    const newImages = [...formData.daftarGambar];
    newImages[index][e.target.name] = e.target.value;
    setFormData({ ...formData, daftarGambar: newImages });
  };
  
  const addImage = () => setFormData({ ...formData, daftarGambar: [...formData.daftarGambar, { urlGambar: '' }] });
  const removeImage = (index) => setFormData({ ...formData, daftarGambar: formData.daftarGambar.filter((_, i) => i !== index) });

  const handleSubmit = e => {
    e.preventDefault();
    const url = isEditMode ? `http://localhost:8080/api/galeri/${id}` : 'http://localhost:8080/api/galeri';
    const method = isEditMode ? 'PUT' : 'POST';

    fetch(url, { method, headers: createAuthHeader(), body: JSON.stringify(formData) })
      .then(res => {
        if (res.ok) {
          alert('Galeri berhasil disimpan!');
          navigate('/galeri');
        } else {
          alert('Gagal menyimpan galeri.');
        }
      });
  };

  return (
    <div className="cms-page">
      <h2>{isEditMode ? 'Edit' : 'Tambah'} Galeri</h2>
      <form onSubmit={handleSubmit} className="cms-form">
        <label>Judul Galeri</label>
        <input type="text" name="judul" value={formData.judul} onChange={handleChange} required />
        <label>Deskripsi</label>
        <textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange} rows="3" />
        
        <fieldset><legend>Daftar Gambar</legend>
          {formData.daftarGambar.map((item, index) => (
            <div key={index} className="dynamic-input">
              <input name="urlGambar" value={item.urlGambar} onChange={e => handleImageChange(e, index)} placeholder={`Nama file gambar #${index + 1}`} />
              <button type="button" onClick={() => removeImage(index)}>Hapus</button>
            </div>
          ))}
          <button type="button" onClick={addImage}>Tambah Gambar</button>
        </fieldset>
        
        <button type="submit" className="cms-button">{isEditMode ? 'Update' : 'Simpan'}</button>
      </form>
    </div>
  );
};

export default GaleriForm;