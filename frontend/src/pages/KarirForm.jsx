import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../Cms.css";

const KarirForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsLoading(true);
      fetch(`http://localhost:8080/api/karir/${id}`, {
        headers: createAuthHeader(),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Gagal mengambil data dari server.");
          return res.json();
        })
        .then((data) => setFormData(data))
        .catch((err) => toast.error("Terjadi kesalahan: " + err.message))
        .finally(() => setIsLoading(false));
    }
  }, [id, isEditMode]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleListChange = (e, index, type) => {
    const newList = [...formData[type]];
    newList[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [type]: newList });
  };

  const addListItem = (type) =>
    setFormData({
      ...formData,
      [type]: [...formData[type], { deskripsi: "" }],
    });

  const removeListItem = (index, type) =>
    setFormData({
      ...formData,
      [type]: formData[type].filter((_, i) => i !== index),
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi Frontend List Dinamis
    if (formData.jobDescriptions.length === 0 || formData.jobDescriptions.some(item => item.deskripsi.trim() === "")) {
      toast.error("Mohon isi minimal satu Deskripsi Pekerjaan.");
      return;
    }
    if (formData.requirements.length === 0 || formData.requirements.some(item => item.deskripsi.trim() === "")) {
      toast.error("Mohon isi minimal satu Syarat (Requirements).");
      return;
    }
    if (formData.benefits.length === 0 || formData.benefits.some(item => item.deskripsi.trim() === "")) {
      toast.error("Mohon isi minimal satu Benefit.");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    const url = isEditMode
      ? `http://localhost:8080/api/karir/${id}`
      : "http://localhost:8080/api/karir";
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: createAuthHeader(),
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(`Lowongan berhasil ${isEditMode ? "diperbarui" : "ditambahkan"}!`);
        navigate("/karir");
      } else {
        const errorText = await response.text();
        toast.error(errorText || "Gagal menyimpan lowongan.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Gagal terhubung ke server. Pastikan Backend aktif.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditMode && isLoading) {
    return <div className="cms-page"><h2 className="loading-text">Memuat data...</h2></div>;
  }

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
          placeholder="Contoh: IT Support"
          required
        />

        <label>Divisi</label>
        <input
          type="text"
          name="divisi"
          value={formData.divisi}
          onChange={handleChange}
          placeholder="Contoh: Teknologi Informasi"
          required
        />

        <label>Deskripsi Singkat (untuk halaman daftar)</label>
        <textarea
          name="deskripsiSingkat"
          value={formData.deskripsiSingkat}
          onChange={handleChange}
          rows="3"
          placeholder="Tuliskan gambaran umum posisi ini..."
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
                required
              />
              <button
                type="button"
                className="btn-remove"
                onClick={() => removeListItem(index, "jobDescriptions")}
              >
                Hapus
              </button>
            </div>
          ))}
          <button type="button" className="cms-button" onClick={() => addListItem("jobDescriptions")}>
            + Tambah Deskripsi Pekerjaan
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
                required
              />
              <button
                type="button"
                className="btn-remove"
                onClick={() => removeListItem(index, "requirements")}
              >
                Hapus
              </button>
            </div>
          ))}
          <button type="button" className="cms-button" onClick={() => addListItem("requirements")}>
            + Tambah Syarat
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
                required
              />
              <button
                type="button"
                className="btn-remove"
                onClick={() => removeListItem(index, "benefits")}
              >
                Hapus
              </button>
            </div>
          ))}
          <button type="button" className="cms-button" onClick={() => addListItem("benefits")}>
            + Tambah Benefit
          </button>
        </fieldset>

        <button 
          type="submit" 
          className="cms-button"
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
        >
          {isSubmitting ? "Menyimpan..." : (isEditMode ? "Perbarui Data" : "Simpan Data")}
        </button>
      </form>
    </div>
  );
};

export default KarirForm;