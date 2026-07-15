import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; // Import toast
import "../Cms.css";

const KontakInfoForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
    const token = localStorage.getItem("auth_token");
    return {
      Authorization: token,
      "Content-Type": "application/json",
    };
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8080/api/kontak-info", {
      headers: createAuthHeader(), // Gunakan token dinamis
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data kontak.");
        return res.json();
      })
      .then((data) => setFormData(data))
      .catch((err) => toast.error("Terjadi kesalahan: " + err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8080/api/kontak-info", {
        method: "PUT",
        headers: createAuthHeader(),
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Informasi Kontak berhasil diperbarui!");
      } else {
        const errorText = await response.text();
        toast.error(errorText || "Gagal memperbarui data kontak.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Gagal terhubung ke server. Pastikan Backend aktif.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="cms-page"><h2 className="loading-text">Memuat data...</h2></div>;
  }

  return (
    <div className="cms-page">
      <h2>Pengaturan Informasi Kontak</h2>
      <form onSubmit={handleSubmit} className="cms-form">
        
        {/* Bungkus dengan form-group agar layout rapi */}
        <div className="form-group">
          <label>Nomor Telepon</label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            placeholder="Contoh: 08123456789"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Contoh: info@koperasi.com"
          />
        </div>

        <div className="form-group">
          <label>Alamat</label>
          <textarea
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            rows="3"
            placeholder="Alamat lengkap kantor..."
          />
        </div>

        <div className="form-group">
          <label>URL Facebook</label>
          <input
            type="text"
            name="facebookUrl"
            value={formData.facebookUrl || ""}
            onChange={handleChange}
            placeholder="Link ke Facebook"
          />
        </div>

        <div className="form-group">
          <label>URL Instagram</label>
          <input
            type="text"
            name="instagramUrl"
            value={formData.instagramUrl || ""}
            onChange={handleChange}
            placeholder="Link ke Instagram"
          />
        </div>

        <div className="form-group">
          <label>URL YouTube</label>
          <input
            type="text"
            name="youtubeUrl"
            value={formData.youtubeUrl || ""}
            onChange={handleChange}
            placeholder="Link ke channel YouTube"
          />
        </div>

        <div className="form-group">
          <label>URL Embed Google Maps</label>
          <textarea
            name="googleMapsUrl"
            value={formData.googleMapsUrl || ""}
            onChange={handleChange}
            rows="4"
            placeholder="Link embed iframe Google Maps"
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

export default KontakInfoForm;