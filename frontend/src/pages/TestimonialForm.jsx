import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "../Cms.css";

const TestimonialForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    category: "",
    review: "",
    fullReview: "",
    author: "",
    role: "",
    urlGambar: "",
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
      fetch(`http://localhost:8080/api/testimonials/${id}`, {
        headers: createAuthHeader(), // Menggunakan token dinamis
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
      ? `http://localhost:8080/api/testimonials/${id}`
      : "http://localhost:8080/api/testimonials";
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: createAuthHeader(),
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(`Testimonial berhasil ${isEditMode ? "diperbarui" : "ditambahkan"}!`);
        navigate("/testimonials");
      } else {
        const errorText = await response.text();
        toast.error(errorText || "Gagal menyimpan testimonial.");
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
      <h2>{isEditMode ? "Edit" : "Tambah"} Testimonial</h2>
      <form onSubmit={handleSubmit} className="cms-form">
        <label>Kategori</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Contoh: Layanan Simpanan"
          required
        />
        
        <label>Nama Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Nama pembuat testimoni"
          required
        />
        
        <label>Pekerjaan / Jabatan</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Contoh: Pengusaha UMKM"
          required
        />
        
        <label>URL Gambar (Nama file)</label>
        <input
          type="text"
          name="urlGambar"
          value={formData.urlGambar}
          onChange={handleChange}
          placeholder="URL atau nama file foto profil"
          required
        />
        
        <label>Review Singkat</label>
        <textarea
          name="review"
          value={formData.review}
          onChange={handleChange}
          rows="3"
          placeholder="Kutipan singkat review..."
          required
        />
        
        <label>Review Lengkap</label>
        <textarea
          name="fullReview"
          value={formData.fullReview}
          onChange={handleChange}
          rows="6"
          placeholder="Tuliskan ulasan lengkap di sini..."
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

export default TestimonialForm;