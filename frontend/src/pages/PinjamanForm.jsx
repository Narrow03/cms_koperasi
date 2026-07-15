import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../Cms.css";

const PinjamanForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    nama: "",
    slug: "",
    urlGambar: "",
    deskripsi: "",
    syarat: [],
    benefit: [],
  });

  const createAuthHeader = () => {
    const token = localStorage.getItem("auth_token");
    return {
      Authorization: token,
      "Content-Type": "application/json",
    };
  };

  // Mengambil data jika dalam mode edit
  useEffect(() => {
    if (isEditMode) {
      fetch(`http://localhost:8080/api/pinjaman/${id}`, {
        headers: { Authorization: localStorage.getItem("auth_token") },
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

  const handleListChange = (e, index, type) => {
    const newList = [...formData[type]];
    newList[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [type]: newList });
  };

  const addListItem = (type) =>
    setFormData({
      ...formData,
      [type]: [...formData[type], { deskripsi: "" }],
    });

  const removeListItem = (index, type) =>
    setFormData({
      ...formData,
      [type]: formData[type].filter((_, i) => i !== index),
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- VALIDASI FRONTEND ---
    // Cek apakah list syarat kosong atau ada item yang tidak diisi
    if (formData.syarat.length === 0 || formData.syarat.some(item => item.deskripsi.trim() === "")) {
      toast.error("Mohon isi minimal satu syarat dengan benar.");
      return;
    }

    // Cek apakah list benefit kosong atau ada item yang tidak diisi
    if (formData.benefit.length === 0 || formData.benefit.some(item => item.deskripsi.trim() === "")) {
      toast.error("Mohon isi minimal satu benefit dengan benar.");
      return;
    }

    const url = isEditMode
      ? `http://localhost:8080/api/pinjaman/${id}`
      : "http://localhost:8080/api/pinjaman";
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: createAuthHeader(),
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(`Produk pinjaman berhasil ${isEditMode ? "diperbarui" : "ditambahkan"}!`);
        navigate("/pinjaman");
      } else {
        // Menangkap pesan error dari backend (misal: "Slug sudah digunakan")
        const errorText = await response.text();
        toast.error(errorText || "Gagal menyimpan data produk.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Gagal terhubung ke server. Pastikan Backend aktif.");
    }
  };

  return (
    <div className="cms-page">
      <h2>{isEditMode ? "Edit" : "Tambah"} Produk Pinjaman</h2>
      <form onSubmit={handleSubmit} className="cms-form">
        <label>Nama Produk</label>
        <input
          type="text"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          placeholder="Contoh: Pinjaman Modal Usaha"
          required
        />

        <label>Slug (URL Unik)</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="Contoh: pinjaman-modal-usaha"
          required
        />

        <label>URL Gambar</label>
        <input
          type="text"
          name="urlGambar"
          value={formData.urlGambar}
          onChange={handleChange}
          placeholder="URL Gambar"
          required
        />

        <label>Deskripsi</label>
        <textarea
          name="deskripsi"
          value={formData.deskripsi}
          onChange={handleChange}
          rows="4"
          placeholder="Jelaskan detail produk di sini..."
          required
        />

        {/* --- BAGIAN SYARAT --- */}
        <fieldset>
          <legend>Syarat-Syarat</legend>
          {formData.syarat.map((item, index) => (
            <div key={index} className="dynamic-input">
              <input
                name="deskripsi"
                value={item.deskripsi}
                onChange={(e) => handleListChange(e, index, "syarat")}
                placeholder={`Syarat #${index + 1}`}
                required
              />
              <button
                type="button"
                className="btn-remove"
                onClick={() => removeListItem(index, "syarat")}
              >
                Hapus
              </button>
            </div>
          ))}
          <button type="button" className="cms-button" onClick={() => addListItem("syarat")}>
            + Tambah Item Syarat
          </button>
        </fieldset>

        {/* --- BAGIAN BENEFIT --- */}
        <fieldset>
          <legend>Keuntungan (Benefit)</legend>
          {formData.benefit.map((item, index) => (
            <div key={index} className="dynamic-input">
              <input
                name="deskripsi"
                value={item.deskripsi}
                onChange={(e) => handleListChange(e, index, "benefit")}
                placeholder={`Benefit #${index + 1}`}
                required
              />
              <button
                type="button"
                className="btn-remove"
                onClick={() => removeListItem(index, "benefit")}
              >
                Hapus
              </button>
            </div>
          ))}
          <button type="button" className="cms-button" onClick={() => addListItem("benefit")}>
            + Tambah Item Benefit
          </button>
        </fieldset>

        <button type="submit" className="cms-button">
          {isEditMode ? "Perbarui Data" : "Simpan Data"}
        </button>
      </form>
    </div>
  );
};

export default PinjamanForm;