package com.koperasiProject.admin.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "simpanan")
public class Simpanan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nama;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(name = "url_gambar", nullable = false)
    private String urlGambar;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String deskripsi;

    // Relasi One-to-Many ke SyaratSimpanan
    @OneToMany(
        mappedBy = "simpanan",
        cascade = CascadeType.ALL, // Jika Simpanan disimpan/dihapus, Syarat ikut tersimpan/dihapus
        orphanRemoval = true
    )
    private List<SyaratSimpanan> syarat = new ArrayList<>();

    // Relasi One-to-Many ke BenefitSimpanan
    @OneToMany(
        mappedBy = "simpanan",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<BenefitSimpanan> benefit = new ArrayList<>();

    // Constructors, Getters, dan Setters
    public Simpanan() {}

    // Getters and Setters...
    public Long getId(){ return id; }
    public void setId(Long id) { this.id = id; }
    public String getNama() { return nama; }
    public void setNama(String nama) { this.nama = nama; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getUrlGambar() { return urlGambar; }
    public void setUrlGambar(String urlGambar) { this.urlGambar = urlGambar; }
    public String getDeskripsi() { return deskripsi; }
    public void setDeskripsi(String deskripsi) { this.deskripsi = deskripsi; }
    public List<SyaratSimpanan> getSyarat() { return syarat; }
    public void setSyarat(List<SyaratSimpanan> syarat) { this.syarat = syarat; }
    public List<BenefitSimpanan> getBenefit() { return benefit; }
    public void setBenefit(List<BenefitSimpanan> benefit) { this.benefit = benefit; }
}