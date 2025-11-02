package com.koperasiProject.admin.model;

import jakarta.persistence.*;

@Entity
@Table(name = "testimonial")
public class Testimonial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String category; // Default value

    @Column(nullable = false, columnDefinition = "TEXT")
    private String review; // Teks singkat

    @Column(nullable = false, columnDefinition = "TEXT")
    private String fullReview; // Teks lengkap

    @Column(nullable = false)
    private String author; // Nama pemberi testimoni

    @Column(nullable = false)
    private String role; // Jabatan/status pemberi testimoni

    @Column(name = "url_gambar", nullable = false)
    private String urlGambar; // Nama file gambar

    // Constructors
    public Testimonial() {}

    // Getters and Setters (Pastikan generate semua)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getReview() { return review; }
    public void setReview(String review) { this.review = review; }
    public String getFullReview() { return fullReview; }
    public void setFullReview(String fullReview) { this.fullReview = fullReview; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getUrlGambar() { return urlGambar; }
    public void setUrlGambar(String urlGambar) { this.urlGambar = urlGambar; }
}