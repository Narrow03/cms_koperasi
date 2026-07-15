import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "../Cms.css";

const PengurusList = () => {
  const [pengurus, setPengurus] = useState([]);
  const [loading, setLoading] = useState(true);

  const createAuthHeader = () => {
    const token = localStorage.getItem("auth_token");
    return {
      Authorization: token,
      "Content-Type": "application/json",
    };
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/pengurus", { headers: createAuthHeader() })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data pengurus.");
        return res.json();
      })
      .then((data) => {
        setPengurus(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data pengurus ini?")) {
      fetch(`http://localhost:8080/api/pengurus/${id}`, {
        method: "DELETE",
        headers: createAuthHeader(),
      })
        .then((res) => {
          if (res.ok) {
            setPengurus(pengurus.filter((p) => p.id !== id));
            toast.success("Data pengurus berhasil dihapus!");
          } else {
            toast.error("Gagal menghapus data pengurus.");
          }
        })
        .catch(() => {
          toast.error("Terjadi kesalahan koneksi saat menghapus.");
        });
    }
  };

  if (loading) return <p className="loading-text">Memuat data pengurus...</p>;

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
          {pengurus.length > 0 ? (
            pengurus.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nama}</td>
                <td>{item.jabatan}</td>
                <td>{item.tipe}</td>
                <td>
                  <div className="action-buttons">
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
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                Tidak ada data pengurus.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PengurusList;