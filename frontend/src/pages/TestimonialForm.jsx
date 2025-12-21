import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Cms.css";

const TestimonialForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
    category: "",
    review: "",
    fullReview: "",
    author: "",
    role: "",
    urlGambar: "",
  });

  const createAuthHeader = () => {
    // 1. Ambil token TEPAT saat fungsi ini dipanggil
    const token = localStorage.getItem("auth_token");

    return {
      Authorization: token,
      "Content-Type": "application/json",
    };
  };

  useEffect(() => {
    if (isEditMode) {
      fetch(`http://localhost:8080/api/testimonials/${id}`, {
        headers: { Authorization: "Basic " + btoa("admin:password123") },
      })
        .then((res) => res.json())
        .then((data) => setFormData(data));
    }
  }, [id, isEditMode]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEditMode
      ? `http://localhost:8080/api/testimonials/${id}`
      : "http://localhost:8080/api/testimonials";
    const method = isEditMode ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: createAuthHeader(),
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        alert("Testimonial berhasil disimpan!");
        navigate("/testimonials");
      } else {
        alert("Gagal menyimpan testimonial.");
      }
    });
  };

  return (
    <div className="cms-page">
      <h2>{isEditMode ? "Edit" : "Tambah"} Testimonial</h2>
      <form onSubmit={handleSubmit} className="cms-form">
        <div className="form-group">
          <label>Kategori</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nama Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Pekerjaan</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>URL Gambar (Nama file)</label>
          <input
            type="text"
            name="urlGambar"
            value={formData.urlGambar}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Review Singkat</label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>
        <div className="form-group">
          <label>Review Lengkap</label>
          <textarea
            name="fullReview"
            value={formData.fullReview}
            onChange={handleChange}
            rows="6"
            required
          />
        </div>
        <button type="submit" className="cms-button">
          {isEditMode ? "Update" : "Simpan"}
        </button>
      </form>
    </div>
  );
};
export default TestimonialForm;
