import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "../Cms.css";

const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const createAuthHeader = () => {
    const token = localStorage.getItem("auth_token");
    return {
      Authorization: token,
      "Content-Type": "application/json",
    };
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/testimonials", {
      headers: createAuthHeader(),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data testimonial.");
        return res.json();
      })
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus testimonial ini?")) {
      fetch(`http://localhost:8080/api/testimonials/${id}`, {
        method: "DELETE",
        headers: createAuthHeader(),
      })
        .then((res) => {
          if (res.ok) {
            setTestimonials(testimonials.filter((t) => t.id !== id));
            toast.success("Testimonial berhasil dihapus!");
          } else {
            toast.error("Gagal menghapus testimonial.");
          }
        })
        .catch(() => {
          toast.error("Terjadi kesalahan koneksi saat menghapus.");
        });
    }
  };

  if (loading) return <p className="loading-text">Memuat data testimonial...</p>;

  return (
    <div className="cms-page">
      <div className="page-header">
        <h2>Daftar Testimonial</h2>
        <Link to="/testimonials/baru" className="cms-button">
          Tambah Testimonial
        </Link>
      </div>
      <table className="cms-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Author</th>
            <th>Pekerjaan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.length > 0 ? (
            testimonials.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.author}</td>
                <td>{item.role}</td>
                <td>
                  <div className="action-buttons">
                    <Link
                      to={`/testimonials/edit/${item.id}`}
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
                Tidak ada data testimonial.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TestimonialList;