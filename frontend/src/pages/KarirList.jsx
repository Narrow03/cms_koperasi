import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../Cms.css";

const KarirList = () => {
  const [karir, setKarir] = useState([]);
  const [loading, setLoading] = useState(true);

  const createAuthHeader = () => {
    const token = localStorage.getItem("auth_token");
    return {
      Authorization: token,
      "Content-Type": "application/json",
    };
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/karir", { headers: createAuthHeader() })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data lowongan.");
        return res.json();
      })
      .then((data) => {
        setKarir(data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus lowongan ini?")) {
      fetch(`http://localhost:8080/api/karir/${id}`, {
        method: "DELETE",
        headers: createAuthHeader(),
      })
        .then((res) => {
          if (res.ok) {
            setKarir(karir.filter((k) => k.id !== id));
            toast.success("Lowongan berhasil dihapus!");
          } else {
            toast.error("Gagal menghapus lowongan.");
          }
        })
        .catch(() => {
          toast.error("Terjadi kesalahan koneksi saat menghapus.");
        });
    }
  };

  if (loading) return <p className="loading-text">Memuat data karir...</p>;

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
          {karir.length > 0 ? (
            karir.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.posisi}</td>
                <td>{item.divisi}</td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/karir/edit/${item.id}`} className="cms-button edit">
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
              <td colSpan="4" style={{ textAlign: "center" }}>
                Tidak ada data lowongan karir.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default KarirList;