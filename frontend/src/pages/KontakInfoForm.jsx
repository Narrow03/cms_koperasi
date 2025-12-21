import React, { useState, useEffect } from "react";
import "../Cms.css";

const KontakInfoForm = () => {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    facebookUrl: "",
    instagramUrl: "",
    youtubeUrl: "",
    address: "",
    googleMapsUrl: "",
  });
  const createAuthHeader = () => {
    // 1. Ambil token TEPAT saat fungsi ini dipanggil
    const token = localStorage.getItem("auth_token");

    return {
      Authorization: token,
      "Content-Type": "application/json",
    };
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/kontak-info", {
      headers: { Authorization: "Basic " + btoa("admin:password123") },
    })
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/kontak-info", {
      method: "PUT",
      headers: createAuthHeader(),
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        alert("Informasi Kontak berhasil diperbarui!");
      } else {
        alert("Gagal memperbarui data.");
      }
    });
  };

  return (
    <div className="cms-page">
      <h2>Pengaturan Informasi Kontak</h2>
      <form onSubmit={handleSubmit} className="cms-form">
        <label>Nomor Telepon</label>
        <input
          type="text"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
        />
        <label>Alamat</label>
        <textarea
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
          rows="3"
        />
        <label>URL Facebook</label>
        <input
          type="text"
          name="facebookUrl"
          value={formData.facebookUrl || ""}
          onChange={handleChange}
        />
        <label>URL Instagram</label>
        <input
          type="text"
          name="instagramUrl"
          value={formData.instagramUrl || ""}
          onChange={handleChange}
        />
        <label>URL YouTube</label>
        <input
          type="text"
          name="youtubeUrl"
          value={formData.youtubeUrl || ""}
          onChange={handleChange}
        />
        <label>URL Embed Google Maps</label>
        <textarea
          name="googleMapsUrl"
          value={formData.googleMapsUrl || ""}
          onChange={handleChange}
          rows="4"
        />
        <button type="submit" className="cms-button">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default KontakInfoForm;
