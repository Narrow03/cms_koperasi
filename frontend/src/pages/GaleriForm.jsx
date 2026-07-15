import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "../Cms.css";

const GaleriForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    daftarGambar: [],
  });

  const createAuthHeader = () => {
    const token = localStorage.getItem("auth_token");
    return {
      Authorization: token,
      "Content-Type": "application/json",
    };
  };

  useEffect(() => {
    if (isEditMode) {
      fetch(`http://localhost:8080/api/galeri/${id}`, {
        // Menggunakan createAuthHeader agar sesuai dan tidak di-hardcode
        headers: createAuthHeader(),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Gagal mengambil data dari server.");
          return res.json();
        })
        .then((data) => setFormData(data))
        .catch((err) => toast.error(err.message));
    }
  }, [id, isEditMode]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e, index) => {
    const newImages = [...formData.daftarGambar];
    newImages[index][e.target.name] = e.target.value;
    setFormData({ ...formData, daftarGambar: newImages });
  };

  const addImage = () =>
    setFormData({
      ...formData,
      daftarGambar: [...formData.daftarGambar, { urlGambar: "" }],
    });

  const removeImage = (index) =>
    setFormData({
      ...formData,
      daftarGambar: formData.daftarGambar.filter((_, i) => i !== index),
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- VALIDASI FRONTEND ---
    if (formData.daftarGambar.length === 0 || formData.daftarGambar.some(item => item.urlGambar.trim() === "")) {
      toast.error("Mohon isi minimal satu URL gambar dengan benar.");
      return;
    }

    const url = isEditMode
      ? `http://localhost:8080/api/galeri/${id}`
      : "http://localhost:8080/api/galeri";
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: createAuthHeader(),
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(`Galeri berhasil ${isEditMode ? "diperbarui" : "ditambahkan"}!`);
        navigate("/galeri");
      } else {
        const errorText = await response.text();
        toast.error(errorText || "Gagal menyimpan galeri.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Gagal terhubung ke server. Pastikan Backend aktif.");
    }
  };

  return (
    <div className="cms-page">
      <h2>{isEditMode ? "Edit" : "Tambah"} Galeri</h2>
      <form onSubmit={handleSubmit} className="cms-form">
        <label>Judul Galeri</label>
        <input
          type="text"
          name="judul"
          value={formData.judul}
          onChange={handleChange}
          placeholder="Contoh: Kegiatan Sosial 2024"
          required
        />
        <label>Deskripsi</label>
        <textarea
          name="deskripsi"
          value={formData.deskripsi}
          onChange={handleChange}
          placeholder="Jelaskan tentang galeri ini..."
          rows="3"
        />

        <fieldset>
          <legend>Daftar Gambar</legend>
          {formData.daftarGambar.map((item, index) => (
            <div key={index} className="dynamic-input">
              <input
                name="urlGambar"
                value={item.urlGambar}
                onChange={(e) => handleImageChange(e, index)}
                placeholder={`URL / Nama file gambar #${index + 1}`}
                required
              />
              <button 
                type="button" 
                className="btn-remove" 
                onClick={() => removeImage(index)}
              >
                Hapus
              </button>
            </div>
          ))}
          <button type="button" className="cms-button" onClick={addImage}>
            + Tambah Gambar
          </button>
        </fieldset>

        <button type="submit" className="cms-button">
          {isEditMode ? "Perbarui Data" : "Simpan Data"}
        </button>
      </form>
    </div>
  );
};

export default GaleriForm;