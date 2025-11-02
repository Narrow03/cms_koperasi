package com.koperasiProject.admin.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "berita")
public class Berita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String judul;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(name = "deskripsi_singkat", columnDefinition = "TEXT")
    private String deskripsiSingkat;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String konten;

    @Column(name = "url_gambar", nullable = false)
    private String urlGambar;

    @Column(name = "tanggal_berita", nullable = false)
    private LocalDate tanggalBerita;

    // Constructors, Getters, dan Setters
    public Berita() {}

    // Pastikan semua getter dan setter dibuat
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getJudul() { return judul; }
    public void setJudul(String judul) { this.judul = judul; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getDeskripsiSingkat() { return deskripsiSingkat; }
    public void setDeskripsiSingkat(String deskripsiSingkat) { this.deskripsiSingkat = deskripsiSingkat; }
    public String getKonten() { return konten; }
    public void setKonten(String konten) { this.konten = konten; }
    public String getUrlGambar() { return urlGambar; }
    public void setUrlGambar(String urlGambar) { this.urlGambar = urlGambar; }
    public LocalDate getTanggalBerita() { return tanggalBerita; }
    public void setTanggalBerita(LocalDate tanggalBerita) { this.tanggalBerita = tanggalBerita; }
}