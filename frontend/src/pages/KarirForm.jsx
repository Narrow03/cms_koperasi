import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../Cms.css";

const KarirForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    posisi: "",
    divisi: "",
    deskripsiSingkat: "",
    jobDescriptions: [],
    requirements: [],
    benefits: [],
  });

  const createAuthHeader = () => {
    const token = localStorage.getItem("auth_token");

    return {
      Authorization: token,
      "Content-Type": "application/json",
    };
  };

  // Mengambil data jika dalam mode edit
  useEffect(() => {
    if (isEditMode) {
      fetch(`http://localhost:8080/api/karir/${id}`, {
        headers: { Authorization: localStorage.getItem("auth_token") },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Gagal mengambil data");
          return res.json();
        })
        .then((data) => setFormData(data))
        .catch(() => toast.error("Gagal memuat data lowongan."));
    }
  }, [id, isEditMode]);

  // Handler untuk input biasa
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handler untuk input dalam array/list
  const handleListChange = (e, index, type) => {
    const newList = [...formData[type]];
    newList[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [type]: newList });
  };

  // Menambah item baru ke dalam list tertentu
  const addListItem = (type) =>
    setFormData({
      ...formData,
      [type]: [...formData[type], { deskripsi: "" }],
    });

  // Menghapus item dari list tertentu berdasarkan index
  const removeListItem = (index, type) =>
    setFormData({
      ...formData,
      [type]: formData[type].filter((_, i) => i !== index),
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = isEditMode
      ? `http://localhost:8080/api/karir/${id}`
      : "http://localhost:8080/api/karir";
    const method = isEditMode ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: createAuthHeader(),
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        alert("Lowongan berhasil disimpan!");
        navigate("/karir");
      } else {
        alert("Gagal menyimpan lowongan.");
      }
    });
  };

  return (
    <div className="cms-page">
      <h2>{isEditMode ? "Edit" : "Tambah"} Lowongan Karir</h2>
      <form onSubmit={handleSubmit} className="cms-form">
        <label>Posisi</label>
        <input
          type="text"
          name="posisi"
          value={formData.posisi}
          onChange={handleChange}
          required
        />

        <label>Divisi</label>
        <input
          type="text"
          name="divisi"
          value={formData.divisi}
          onChange={handleChange}
          required
        />

        <label>Deskripsi Singkat (untuk halaman daftar)</label>
        <textarea
          name="deskripsiSingkat"
          value={formData.deskripsiSingkat}
          onChange={handleChange}
          rows="3"
          required
        />

        {/* --- FIELDSET DESKRIPSI PEKERJAAN --- */}
        <fieldset>
          <legend>Deskripsi Pekerjaan</legend>
          {formData.jobDescriptions.map((item, index) => (
            <div key={index} className="dynamic-input">
              <textarea
                name="deskripsi"
                value={item.deskripsi}
                onChange={(e) => handleListChange(e, index, "jobDescriptions")}
                rows="2"
                placeholder={`Poin Job Desk #${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeListItem(index, "jobDescriptions")}
              >
                Hapus
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addListItem("jobDescriptions")}>
            Tambah Deskripsi Pekerjaan
          </button>
        </fieldset>

        {/* --- FIELDSET REQUIREMENTS --- */}
        <fieldset>
          <legend>Requirements</legend>
          {formData.requirements.map((item, index) => (
            <div key={index} className="dynamic-input">
              <textarea
                name="deskripsi"
                value={item.deskripsi}
                onChange={(e) => handleListChange(e, index, "requirements")}
                rows="2"
                placeholder={`Syarat #${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeListItem(index, "requirements")}
              >
                Hapus
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addListItem("requirements")}>
            Tambah Syarat
          </button>
        </fieldset>

        {/* --- FIELDSET BENEFITS --- */}
        <fieldset>
          <legend>Benefit</legend>
          {formData.benefits.map((item, index) => (
            <div key={index} className="dynamic-input">
              <textarea
                name="deskripsi"
                value={item.deskripsi}
                onChange={(e) => handleListChange(e, index, "benefits")}
                rows="2"
                placeholder={`Benefit #${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeListItem(index, "benefits")}
              >
                Hapus
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addListItem("benefits")}>
            Tambah Benefit
          </button>
        </fieldset>

        <button type="submit" className="cms-button">
          {isEditMode ? "Perbarui Data" : "Simpan Data"}
        </button>
      </form>
    </div>
  );
};

export default KarirForm;
