import React, { useState, useEffect } from "react";
import "../Cms.css";

const StatistikForm = () => {
  const [formData, setFormData] = useState({
    totalAnggota: "",
    totalCabang: "",
    totalKas: "",
  });
  const [loading, setLoading] = useState(true);

  const createAuthHeader = () => {
    // 1. Ambil token TEPAT saat fungsi ini dipanggil
    const token = localStorage.getItem("auth_token");

    return {
      Authorization: token,
      "Content-Type": "application/json",
    };
  };

  // Ambil data statistik saat komponen dimuat
  useEffect(() => {
    fetch("http://localhost:8080/api/statistik", {
      headers: { Authorization: "Basic " + btoa("admin:password123") },
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data statistik:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/statistik", {
      method: "PUT",
      headers: createAuthHeader(),
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        alert("Data statistik berhasil diperbarui!");
      } else {
        alert("Gagal memperbarui data.");
      }
    });
  };

  if (loading) return <p>Memuat data...</p>;

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
        <button type="submit" className="cms-button">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default StatistikForm;
