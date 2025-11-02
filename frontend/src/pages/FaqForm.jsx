import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Cms.css';

const FaqForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({ question: '', answer: '' });
  const createAuthHeader = () => ({
    'Authorization': 'Basic ' + btoa('admin:password123'),
    'Content-Type': 'application/json',
  });

  useEffect(() => {
    if (isEditMode) {
      fetch(`http://localhost:8080/api/faq/${id}`, { headers: {'Authorization': 'Basic ' + btoa('admin:password123')} })
        .then(res => res.json())
        .then(data => setFormData(data));
    }
  }, [id, isEditMode]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const url = isEditMode ? `http://localhost:8080/api/faq/${id}` : 'http://localhost:8080/api/faq';
    const method = isEditMode ? 'PUT' : 'POST';

    fetch(url, { method, headers: createAuthHeader(), body: JSON.stringify(formData) })
      .then(res => {
        if (res.ok) {
          alert('FAQ berhasil disimpan!');
          navigate('/faq');
        } else {
          alert('Gagal menyimpan FAQ.');
        }
      });
  };

  return (
    <div className="cms-page">
      <h2>{isEditMode ? 'Edit' : 'Tambah'} FAQ</h2>
      <form onSubmit={handleSubmit} className="cms-form">
        <label>Pertanyaan</label>
        <textarea name="question" value={formData.question} onChange={handleChange} rows="3" required />
        <label>Jawaban</label>
        <textarea name="answer" value={formData.answer} onChange={handleChange} rows="6" required />
        <button type="submit" className="cms-button">{isEditMode ? 'Update' : 'Simpan'}</button>
      </form>
    </div>
  );
};

export default FaqForm;