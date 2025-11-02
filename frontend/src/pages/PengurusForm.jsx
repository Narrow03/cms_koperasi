import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Cms.css";

const PengurusForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "",
    bio: "",
    urlGambar: "",
    tipe: "Pimpinan", // Nilai default
  });

  const createAuthHeader = () => ({
    Authorization: "Basic " + btoa("admin:password123"),
    "Content-Type": "application/json",
  });

  useEffect(() => {
    if (isEditMode) {
      fetch(`http://localhost:8080/api/pengurus/${id}`, {
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
      ? `http://localhost:8080/api/pengurus/${id}`
      : "http://localhost:8080/api/pengurus";
    const method = isEditMode ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: createAuthHeader(),
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        alert("Data pengurus berhasil disimpan!");
        navigate("/pengurus");
      } else {
        alert("Gagal menyimpan data.");
      }
    });
  };

  return (
    <div className="cms-page">
      <h2>{isEditMode ? "Edit" : "Tambah"} Data Pengurus</h2>
      <form onSubmit={handleSubmit} className="cms-form">
        <div className="form-group">
          <label htmlFor="nama">Nama</label>
          <input
            id="nama"
            type="text"
            name="nama"
            value={formData.nama || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="jabatan">Jabatan</label>
          <input
            id="jabatan"
            type="text"
            name="jabatan"
            value={formData.jabatan || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="urlGambar">URL Gambar (Nama file)</label>
          <input
            id="urlGambar"
            type="text"
            name="urlGambar"
            value={formData.urlGambar || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio Singkat</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio || ""}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipe">Tipe Pengurus</label>
          <select
            id="tipe"
            name="tipe"
            value={formData.tipe}
            onChange={handleChange}
          >
            <option value="Pimpinan">Dewan Pimpinan</option>
            <option value="Penasihat">Dewan Penasihat</option>
          </select>
        </div>

        <button type="submit" className="cms-button">
          {isEditMode ? "Update" : "Simpan"}
        </button>
      </form>
    </div>
  );
};

export default PengurusForm;
