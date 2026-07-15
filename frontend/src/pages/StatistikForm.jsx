import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; // Import toast
import "../Cms.css";

const StatistikForm = () => {
  const [formData, setFormData] = useState({
    totalAnggota: "",
    totalCabang: "",
    totalKas: "",
  });
  
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createAuthHeader = () => {
    const token = localStorage.getItem("auth_token");
    return {
      Authorization: token,
      "Content-Type": "application/json",
    };
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/statistik", {
      headers: createAuthHeader(), // Gunakan token dinamis
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data statistik.");
        return res.json();
      })
      .then((data) => {
        setFormData(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8080/api/statistik", {
        method: "PUT",
        headers: createAuthHeader(),
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Data statistik berhasil diperbarui!");
      } else {
        const errorText = await response.text();
        toast.error(errorText || "Gagal memperbarui data statistik.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Gagal terhubung ke server. Pastikan Backend aktif.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="cms-page"><h2 className="loading-text">Memuat data...</h2></div>;

  return (
    <div className="cms-page">
      <h2>Pengaturan Statistik Koperasi</h2>
      <form onSubmit={handleSubmit} className="cms-form">
        <div className="form-group">
          <label htmlFor="totalAnggota">Total Anggota</label>
          <input
            id="totalAnggota"
            type="text"
            name="totalAnggota"
            value={formData.totalAnggota || ""}
            onChange={handleChange}
            placeholder="Contoh: 20.000+"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="totalCabang">Total Cabang</label>
          <input
            id="totalCabang"
            type="text"
            name="totalCabang"
            value={formData.totalCabang || ""}
            onChange={handleChange}
            placeholder="Contoh: 10"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="totalKas">Total Kas/Aset</label>
          <input
            id="totalKas"
            type="text"
            name="totalKas"
            value={formData.totalKas || ""}
            onChange={handleChange}
            placeholder="Contoh: Rp 10 Miliar"
          />
        </div>
        
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
          {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
};

export default StatistikForm;