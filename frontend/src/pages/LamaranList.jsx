import React, { useState, useEffect } from "react";
import "../Cms.css";

const LamaranList = () => {
  const [lamaran, setLamaran] = useState([]);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = "http://localhost:8080";
  const createAuthHeader = () => {
    // 1. Ambil token TEPAT saat fungsi ini dipanggil
    const token = localStorage.getItem("auth_token");

    return {
      Authorization: token,
      "Content-Type": "application/json",
    };
  };
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/lamaran`, { headers: createAuthHeader() })
      .then((res) => res.json())
      .then((data) => {
        setLamaran(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gagal mengambil data lamaran:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus lamaran ini?")) {
      fetch(`${BACKEND_URL}/api/lamaran/${id}`, {
        method: "DELETE",
        headers: createAuthHeader(),
      }).then((response) => {
        if (response.ok) {
          setLamaran(lamaran.filter((item) => item.id !== id));
          alert("Lamaran berhasil dihapus!");
        } else {
          alert("Gagal menghapus lamaran.");
        }
      });
    }
  };

  if (loading) return <p>Memuat data lamaran...</p>;

  return (
    <div className="cms-page">
      <div className="page-header">
        <h2>Daftar Lamaran Masuk</h2>
      </div>
      <table className="cms-table">
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Posisi</th>
            <th>Nama Pelamar</th>
            <th>Email & Telepon</th>
            <th>Resume</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {lamaran.map((item) => (
            <tr key={item.id}>
              <td>{new Date(item.tanggalLamaran).toLocaleString("id-ID")}</td>
              <td>{item.posisi}</td>
              <td>{item.nama}</td>
              <td>
                {item.email}
                <br />
                {item.phone}
              </td>
              <td>
                {/* Link untuk men-download resume */}
                <a
                  href={`${BACKEND_URL}/api/files/resumes/${item.namaFileResume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.namaFileResume}
                </a>
              </td>
              <td>
                {/* Tombol untuk menghapus lamaran */}
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

export default LamaranList;
