import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Cms.css";

const PengurusList = () => {
  const [pengurus, setPengurus] = useState([]);
  const createAuthHeader = () => {
    // 1. Ambil token TEPAT saat fungsi ini dipanggil
    const token = localStorage.getItem("auth_token");

    return {
      Authorization: token,
      "Content-Type": "application/json",
    };
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/pengurus", { headers: createAuthHeader() })
      .then((res) => res.json())
      .then((data) => setPengurus(data));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data pengurus ini?")) {
      fetch(`http://localhost:8080/api/pengurus/${id}`, {
        method: "DELETE",
        headers: createAuthHeader(),
      }).then((res) => {
        if (res.ok) setPengurus(pengurus.filter((p) => p.id !== id));
      });
    }
  };

  return (
    <div className="cms-page">
      <div className="page-header">
        <h2>Daftar Struktur Manajemen</h2>
        <Link to="/pengurus/baru" className="cms-button">
          Tambah Pengurus
        </Link>
      </div>
      <table className="cms-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Jabatan</th>
            <th>Tipe</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pengurus.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nama}</td>
              <td>{item.jabatan}</td>
              <td>{item.tipe}</td>
              <td>
                <Link
                  to={`/pengurus/edit/${item.id}`}
                  className="cms-button edit"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="cms-button delete"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default PengurusList;
