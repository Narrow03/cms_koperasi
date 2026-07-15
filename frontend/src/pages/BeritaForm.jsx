import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Cms.css";

const BeritaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  // State untuk loading indikator
  const [isLoading, setIsLoading] = useState(false);       // Loading saat ambil data awal
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading saat tombol simpan ditekan

  const [formData, setFormData] = useState({
    judul: "",
    slug: "",
    deskripsiSingkat: "",
    konten: "",
    urlGambar: "",
    tanggalBerita: "",
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
      fetch(`http://localhost:8080/api/berita/${id}`, {
        headers: { Authorization: localStorage.getItem("auth_token") },
      })
        .then((res) => {
           if (!res.ok) throw new Error("Gagal mengambil data");
           return res.json();
        })
        .then((data) => setFormData(data))
        .catch((err) => alert("Terjadi kesalahan: " + err.message))
        .finally(() => setIsLoading(false)); 
    }
  }, [id, isEditMode]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 2. Mencegah Double Submit
    if (isSubmitting) return; 
    setIsSubmitting(true); // Kunci tombol

    const url = isEditMode
      ? `http://localhost:8080/api/berita/${id}`
      : "http://localhost:8080/api/berita";
    const method = isEditMode ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: createAuthHeader(),
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        // Cek jika response tidak OK (misal 400 atau 500)
        if (!res.ok) {
           const errorData = await res.json().catch(() => ({})); 
           throw new Error(errorData.message || "Gagal menyimpan berita.");
        }
        alert("Berita berhasil disimpan!");
        navigate("/berita");
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        // 3. Buka kunci tombol apapun hasilnya
        setIsSubmitting(false); 
      });
  };

  // Tampilkan loading saat edit mode belum siap
  if (isEditMode && isLoading) {
      return <div className="cms-page"><h2>Memuat data...</h2></div>;
  }

  return (
    <div className="cms-page">
      <h2>{isEditMode ? "Edit" : "Tambah"} Berita</h2>
      <form onSubmit={handleSubmit} className="cms-form">
        <label>Judul</label>
        <input
          type="text"
          name="judul"
          value={formData.judul}
          onChange={handleChange}
          required
        />
        <label>Slug</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
        />
        <label>URL Gambar</label>
        <input
          type="text"
          name="urlGambar"
          value={formData.urlGambar}
          onChange={handleChange}
          required
        />
        <label>Tanggal</label>
        <input
          type="date"
          name="tanggalBerita"
          value={formData.tanggalBerita}
          onChange={handleChange}
          required
        />
        <label>Deskripsi Singkat</label>
        <textarea
          name="deskripsiSingkat"
          value={formData.deskripsiSingkat}
          onChange={handleChange}
          rows="3"
        />
        <label>Konten Lengkap</label>
        <textarea
          name="konten"
          value={formData.konten}
          onChange={handleChange}
          rows="10"
          required
        />
        
        {/* 4. Update Tombol Submit */}
        <button 
            type="submit" 
            className="cms-button" 
            disabled={isSubmitting} // Matikan tombol saat loading
            style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
        >
          {isSubmitting ? "Menyimpan..." : (isEditMode ? "Update" : "Simpan")}
        </button>
      </form>
    </div>
  );
};

export default BeritaForm;