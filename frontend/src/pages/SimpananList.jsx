import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Cms.css";

const SimpananList = () => {
  const [simpanan, setSimpanan] = useState([]);
  const [loading, setLoading] = useState(true);

  const createAuthHeader = () => ({
    Authorization: "Basic " + btoa("admin:password123"),
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/simpanan", { headers: createAuthHeader() })
      .then((response) => response.json())
      .then((data) => {
        setSimpanan(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus produk ini?")) {
      fetch(`http://localhost:8080/api/simpanan/${id}`, {
        method: "DELETE",
        headers: createAuthHeader(),
      }).then((response) => {
        if (response.ok) {
          setSimpanan(simpanan.filter((item) => item.id !== id));
          alert("Produk berhasil dihapus!");
        } else {
          alert("Gagal menghapus produk.");
        }
      });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="cms-page">
      <div className="page-header">
        <h2>Daftar Produk Simpanan</h2>
        <Link to="/simpanan/baru" className="cms-button">
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
          {simpanan.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nama}</td>
              <td>{item.slug}</td>
              <td>
                <Link
                  to={`/simpanan/edit/${item.id}`}
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

export default SimpananList;
