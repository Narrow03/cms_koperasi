import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../Cms.css";

const FaqForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({ question: "", answer: "" });

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
      fetch(`http://localhost:8080/api/faq/${id}`, {
        headers: createAuthHeader(), // Mengganti hardcode Basic Auth dengan token dinamis
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
      ? `http://localhost:8080/api/faq/${id}`
      : "http://localhost:8080/api/faq";
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: createAuthHeader(),
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(`FAQ berhasil ${isEditMode ? "diperbarui" : "ditambahkan"}!`);
        navigate("/faq");
      } else {
        const errorText = await response.text();
        toast.error(errorText || "Gagal menyimpan FAQ.");
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
      <h2>{isEditMode ? "Edit" : "Tambah"} FAQ</h2>
      <form onSubmit={handleSubmit} className="cms-form">
        <label>Pertanyaan</label>
        <textarea
          name="question"
          value={formData.question}
          onChange={handleChange}
          rows="3"
          placeholder="Masukkan pertanyaan..."
          required
        />
        <label>Jawaban</label>
        <textarea
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          rows="6"
          placeholder="Masukkan jawaban..."
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

export default FaqForm;