import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "../Cms.css";

const PengurusForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default value "Pimpinan"
  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "",
    bio: "",
    urlGambar: "",
    tipe: "Pimpinan", 
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
      setIsLoading(true);
      fetch(`http://localhost:8080/api/pengurus/${id}`, {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const url = isEditMode
      ? `http://localhost:8080/api/pengurus/${id}`
      : "http://localhost:8080/api/pengurus";
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: createAuthHeader(),
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(`Data pengurus berhasil ${isEditMode ? "diperbarui" : "ditambahkan"}!`);
        navigate("/pengurus");
      } else {
        const errorText = await response.text();
        toast.error(errorText || "Gagal menyimpan data pengurus.");
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
      <h2>{isEditMode ? "Edit" : "Tambah"} Data Pengurus</h2>
      <form onSubmit={handleSubmit} className="cms-form">
        
        <div className="form-group">
          <label htmlFor="nama">Nama Lengkap</label>
          <input
            id="nama"
            type="text"
            name="nama"
            value={formData.nama || ""}
            onChange={handleChange}
            placeholder="Contoh: Budi Santoso"
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
            placeholder="Contoh: Ketua Koperasi"
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
            placeholder="URL atau nama file foto profil"
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
            placeholder="Tuliskan pengalaman atau bio singkat..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipe">Tipe Pengurus</label>
          <select
            id="tipe"
            name="tipe"
            value={formData.tipe}
            onChange={handleChange}
            required
          >
            <option value="Pimpinan">Dewan Pimpinan</option>
            <option value="Penasihat">Dewan Penasihat</option>
          </select>
        </div>

        {/* Saya tambahkan marginTop agar jarak tombol terlihat pas dengan dropdown */}
        <button 
          type="submit" 
          className="cms-button"
          disabled={isSubmitting}
          style={{ 
            opacity: isSubmitting ? 0.7 : 1, 
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            marginTop: '15px', 
            display: 'block' 
          }}
        >
          {isSubmitting ? "Menyimpan..." : (isEditMode ? "Perbarui Data" : "Simpan Data")}
        </button>
      </form>
    </div>
  );
};

export default PengurusForm;