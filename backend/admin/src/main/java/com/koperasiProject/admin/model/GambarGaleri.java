package com.koperasiProject.admin.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "gambar_galeri")
public class GambarGaleri {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "url_gambar", nullable = false)
    private String urlGambar;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "galeri_id")
    @JsonIgnore
    private Galeri galeri;

    public GambarGaleri() {}

    // === TAMBAHKAN SEMUA GETTER DAN SETTER DI BAWAH INI ===

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrlGambar() {
        return urlGambar;
    }

    public void setUrlGambar(String urlGambar) {
        this.urlGambar = urlGambar;
    }

    public Galeri getGaleri() {
        return galeri;
    }

    public void setGaleri(Galeri galeri) {
        this.galeri = galeri;
    }
}