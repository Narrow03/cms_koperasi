import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "../Cms.css";

const SimpananForm = () => {
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

  useEffect(() => {
    if (isEditMode) {

      fetch(`http://localhost:8080/api/simpanan/${id}`, {
        headers: { Authorization: localStorage.getItem("auth_token") },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Gagal mengambil data");
          return res.json();
        })
        .then((data) => setFormData(data))
        .catch(() => toast.error("Gagal memuat data simpanan."));
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Tampilkan loading toast
    const toastId = toast.loading("Sedang menyimpan data...");

    const url = isEditMode
      ? `http://localhost:8080/api/simpanan/${id}`
      : "http://localhost:8080/api/simpanan";
    const method = isEditMode ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: createAuthHeader(),
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // Update toast menjadi sukses
          toast.update(toastId, {
            render: `Produk berhasil ${
              isEditMode ? "diperbarui" : "disimpan"
            }!`,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });

          // Beri sedikit jeda sebelum navigasi agar user bisa baca toast
          setTimeout(() => navigate("/simpanan"), 1500);
        } else {
          throw new Error("Gagal menyimpan");
        }
      })
      .catch((err) => {
        // Update toast menjadi error
        toast.update(toastId, {
          render: "Terjadi kesalahan saat menyimpan data.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="cms-page">
      <h2>{isEditMode ? "Edit" : "Tambah"} Produk Simpanan</h2>
      <form onSubmit={handleSubmit} className="cms-form">
        {/* ... (Bagian input form sama persis seperti sebelumnya) ... */}
        {/* Saya singkat bagian ini agar fokus ke perubahan toast */}

        <div className="form-group">
          <label>Nama Produk</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>URL Gambar</label>
          <input
            type="text"
            name="urlGambar"
            value={formData.urlGambar}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Deskripsi</label>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <fieldset>
          <legend>Syarat</legend>
          {formData.syarat.map((item, index) => (
            <div key={index} className="dynamic-input">
              <input
                name="deskripsi"
                value={item.deskripsi}
                onChange={(e) => handleListChange(e, index, "syarat")}
                placeholder="Isi syarat..."
              />
              <button
                type="button"
                className="cms-button delete-small"
                onClick={() => removeListItem(index, "syarat")}
              >
                Hapus
              </button>
            </div>
          ))}
          <button
            type="button"
            className="cms-button add-small"
            onClick={() => addListItem("syarat")}
          >
            + Tambah Syarat
          </button>
        </fieldset>

        <fieldset>
          <legend>Benefit</legend>
          {formData.benefit.map((item, index) => (
            <div key={index} className="dynamic-input">
              <input
                name="deskripsi"
                value={item.deskripsi}
                onChange={(e) => handleListChange(e, index, "benefit")}
                placeholder="Isi benefit..."
              />
              <button
                type="button"
                className="cms-button delete-small"
                onClick={() => removeListItem(index, "benefit")}
              >
                Hapus
              </button>
            </div>
          ))}
          <button
            type="button"
            className="cms-button add-small"
            onClick={() => addListItem("benefit")}
          >
            + Tambah Benefit
          </button>
        </fieldset>

        <button type="submit" className="cms-button">
          {isEditMode ? "Perbarui" : "Simpan"}
        </button>
      </form>
    </div>
  );
};

export default SimpananForm;
