import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Cms.css";

const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([]);
  const createAuthHeader = () => ({
    Authorization: "Basic " + btoa("admin:password123"),
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/testimonials", {
      headers: createAuthHeader(),
    })
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus testimonial ini?")) {
      fetch(`http://localhost:8080/api/testimonials/${id}`, {
        method: "DELETE",
        headers: createAuthHeader(),
      }).then((res) => {
        if (res.ok) setTestimonials(testimonials.filter((t) => t.id !== id));
      });
    }
  };

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
          {testimonials.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.author}</td>
              <td>{item.role}</td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TestimonialList;
