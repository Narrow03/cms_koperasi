package com.koperasiProject.admin.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "syarat_simpanan")
public class SyaratSimpanan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String deskripsi;

    // Relasi Many-to-One kembali ke Simpanan
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "simpanan_id") // Kolom foreign key di tabel ini
    @JsonIgnore // Mencegah JSON looping tak terbatas
    private Simpanan simpanan;
    
    // Constructors, Getters, dan Setters
    public SyaratSimpanan() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDeskripsi() { return deskripsi; }
    public void setDeskripsi(String deskripsi) { this.deskripsi = deskripsi; }
    public Simpanan getSimpanan() { return simpanan; }
    public void setSimpanan(Simpanan simpanan) { this.simpanan = simpanan; }
}