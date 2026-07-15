import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "../Cms.css";

const PinjamanList = () => {
  const [pinjaman, setPinjaman] = useState([]);
  const [loading, setLoading] = useState(true);

  const createAuthHeader = () => {
    const token = localStorage.getItem("auth_token");

    return {
      Authorization: token,
      "Content-Type": "application/json",
    };
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/pinjaman", { headers: createAuthHeader() })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data, pastikan kredensial benar.");
        }
        return response.json();
      })
      .then((data) => {
        setPinjaman(data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message); // Ganti console.error dengan toast
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    // Tetap gunakan confirm untuk keamanan sebelum menghapus
    if (window.confirm("Apakah Anda yakin ingin menghapus produk pinjaman ini?")) {
      fetch(`http://localhost:8080/api/pinjaman/${id}`, {
        method: "DELETE",
        headers: createAuthHeader(),
      }).then((response) => {
        if (response.ok) {
          setPinjaman(pinjaman.filter((item) => item.id !== id));
          toast.success("Produk berhasil dihapus!"); // Ganti alert dengan toast.success
        } else {
          toast.error("Gagal menghapus produk."); // Ganti alert dengan toast.error
        }
      })
      .catch(() => {
        toast.error("Terjadi kesalahan koneksi saat menghapus.");
      });
    }
  };

  if (loading) return <p className="loading-text">Memuat data pinjaman...</p>;

  return (
    <div className="cms-page">
      <div className="page-header">
        <h2>Daftar Produk Pinjaman</h2>
        <Link to="/pinjaman/baru" className="cms-button">
          Tambah Produk Baru
        </Link>
      </div>
      <table className="cms-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Slug</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pinjaman.length > 0 ? (
            pinjaman.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nama}</td>
                <td>{item.slug}</td>
                <td>
                  <div className="action-buttons">
                    <Link
                      to={`/pinjaman/edit/${item.id}`}
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
              <td colSpan="4" style={{ textAlign: "center" }}>
                Tidak ada data pinjaman.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PinjamanList;