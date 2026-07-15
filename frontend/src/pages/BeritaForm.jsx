import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
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

    // Mencegah Double Submit
    if (isSubmitting) return; 
    setIsSubmitting(true); // Kunci tombol

    const url = isEditMode
      ? `http://localhost:8080/api/berita/${id}`
      : "http://localhost:8080/api/berita";
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: createAuthHeader(),
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(`Berita berhasil ${isEditMode ? "diperbarui" : "ditambahkan"}!`);
        navigate("/berita");
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Gagal menyimpan berita.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      // Buka kunci tombol apapun hasilnya
      setIsSubmitting(false); 
    }
  };

  // Tampilkan loading saat edit mode belum siap
  if (isEditMode && isLoading) {
      return <div className="cms-page"><h2 className="loading-text">Memuat data...</h2></div>;
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
          placeholder="Masukkan judul berita"
          required
        />
        <label>Slug (URL Unik)</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="contoh: judul-berita-hari-ini"
          required
        />
        <label>URL Gambar</label>
        <input
          type="text"
          name="urlGambar"
          value={formData.urlGambar}
          onChange={handleChange}
          placeholder="Masukkan URL atau path gambar"
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
          placeholder="Ringkasan singkat berita..."
          rows="3"
        />
        <label>Konten Lengkap</label>
        <textarea
          name="konten"
          value={formData.konten}
          onChange={handleChange}
          placeholder="Isi berita lengkap di sini..."
          rows="10"
          required
        />
        
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

export default BeritaForm;