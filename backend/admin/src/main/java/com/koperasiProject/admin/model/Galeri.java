package com.koperasiProject.admin.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "galeri")
public class Galeri {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String judul;

    
    @Column(columnDefinition = "TEXT")
    private String deskripsi;

    @OneToMany(mappedBy = "galeri", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GambarGaleri> daftarGambar = new ArrayList<>();

    public Galeri() {}

    // === GETTER DAN SETTER YANG HILANG SEBELUMNYA ===
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJudul() {
        return judul;
    }

    public void setJudul(String judul) {
        this.judul = judul;
    }

    public String getDeskripsi() {
        return deskripsi;
    }

    public void setDeskripsi(String deskripsi) {
        this.deskripsi = deskripsi;
    }

    public List<GambarGaleri> getDaftarGambar() {
        return daftarGambar;
    }

    public void setDaftarGambar(List<GambarGaleri> daftarGambar) {
        this.daftarGambar = daftarGambar;
    }
}