import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Cms.css";

const KarirList = () => {
  const [karir, setKarir] = useState([]);
  const createAuthHeader = () => {
    // 1. Ambil token TEPAT saat fungsi ini dipanggil
    const token = localStorage.getItem("auth_token");

    return {
      Authorization: token,
      "Content-Type": "application/json",
    };
  };
  useEffect(() => {
    fetch("http://localhost:8080/api/karir", { headers: createAuthHeader() })
      .then((res) => res.json())
      .then((data) => setKarir(data));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus lowongan ini?")) {
      fetch(`http://localhost:8080/api/karir/${id}`, {
        method: "DELETE",
        headers: createAuthHeader(),
      }).then((res) => {
        if (res.ok) setKarir(karir.filter((k) => k.id !== id));
      });
    }
  };

  return (
    <div className="cms-page">
      <div className="page-header">
        <h2>Daftar Lowongan Karir</h2>
        <Link to="/karir/baru" className="cms-button">
          Tambah Lowongan
        </Link>
      </div>
      <table className="cms-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Posisi</th>
            <th>Divisi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {karir.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.posisi}</td>
              <td>{item.divisi}</td>
              <td>
                <Link to={`/karir/edit/${item.id}`} className="cms-button edit">
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
export default KarirList;
