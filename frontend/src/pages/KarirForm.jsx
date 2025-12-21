import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Cms.css";

// Helper function untuk mengelola list dinamis
const useDynamicList = (initialValue = []) => {
  const [list, setList] = useState(initialValue);
  const handleChange = (e, index) => {
    const newList = [...list];
    newList[index][e.target.name] = e.target.value;
    setList(newList);
  };
  const addItem = () => setList([...list, { deskripsi: "" }]);
  const removeItem = (index) => setList(list.filter((_, i) => i !== index));
  return [list, setList, handleChange, addItem, removeItem];
};

const KarirForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
    posisi: "",
    divisi: "",
    deskripsiSingkat: "",
  });

  const [jobDescriptions, setJobDescriptions, handleJdChange, addJd, removeJd] =
    useDynamicList([]);
  const [requirements, setRequirements, handleReqChange, addReq, removeReq] =
    useDynamicList([]);
  const [benefits, setBenefits, handleBenChange, addBen, removeBen] =
    useDynamicList([]);

  const createAuthHeader = () => {
    // 1. Ambil token TEPAT saat fungsi ini dipanggil
    const token = localStorage.getItem("auth_token");

    return {
      Authorization: token,
      "Content-Type": "application/json",
    };
  };

  useEffect(() => {
    if (isEditMode) {
      fetch(`http://localhost:8080/api/karir/${id}`, {
        headers: { Authorization: "Basic " + btoa("admin:password123") },
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            posisi: data.posisi,
            divisi: data.divisi,
            deskripsiSingkat: data.deskripsiSingkat,
          });
          setJobDescriptions(data.jobDescriptions);
          setRequirements(data.requirements);
          setBenefits(data.benefits);
        });
    }
  }, [id, isEditMode]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEditMode
      ? `http://localhost:8080/api/karir/${id}`
      : "http://localhost:8080/api/karir";
    const method = isEditMode ? "PUT" : "POST";
    const payload = { ...formData, jobDescriptions, requirements, benefits };

    fetch(url, {
      method,
      headers: createAuthHeader(),
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.ok) {
        alert("Lowongan berhasil disimpan!");
        navigate("/karir");
      } else {
        alert("Gagal menyimpan lowongan.");
      }
    });
  };

  return (
    <div className="cms-page">
      <h2>{isEditMode ? "Edit" : "Tambah"} Lowongan</h2>
      <form onSubmit={handleSubmit} className="cms-form">
        <label>Posisi</label>
        <input
          type="text"
          name="posisi"
          value={formData.posisi}
          onChange={handleChange}
          required
        />
        <label>Divisi</label>
        <input
          type="text"
          name="divisi"
          value={formData.divisi}
          onChange={handleChange}
          required
        />
        <label>Deskripsi Singkat (untuk halaman daftar)</label>
        <textarea
          name="deskripsiSingkat"
          value={formData.deskripsiSingkat}
          onChange={handleChange}
          rows="3"
        />

        {/* Helper component untuk list dinamis */}
        <DynamicList
          title="Deskripsi Pekerjaan"
          list={jobDescriptions}
          handleChange={handleJdChange}
          addItem={addJd}
          removeItem={removeJd}
        />
        <DynamicList
          title="Requirements"
          list={requirements}
          handleChange={handleReqChange}
          addItem={addReq}
          removeItem={removeReq}
        />
        <DynamicList
          title="Benefit"
          list={benefits}
          handleChange={handleBenChange}
          addItem={addBen}
          removeItem={removeBen}
        />

        <button type="submit" className="cms-button">
          {isEditMode ? "Update" : "Simpan"}
        </button>
      </form>
    </div>
  );
};

// Helper component untuk merender fieldset list dinamis
const DynamicList = ({ title, list, handleChange, addItem, removeItem }) => (
  <fieldset>
    <legend>{title}</legend>
    {list.map((item, index) => (
      <div key={index} className="dynamic-input">
        <textarea
          name="deskripsi"
          value={item.deskripsi}
          onChange={(e) => handleChange(e, index)}
          rows="2"
          placeholder={`Poin #${index + 1}`}
        />
        <button type="button" onClick={() => removeItem(index)}>
          Hapus
        </button>
      </div>
    ))}
    <button type="button" onClick={addItem}>
      Tambah Poin
    </button>
  </fieldset>
);

export default KarirForm;
