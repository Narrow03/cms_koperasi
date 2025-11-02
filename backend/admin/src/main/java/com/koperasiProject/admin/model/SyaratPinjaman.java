package com.koperasiProject.admin.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "syarat_pinjaman")
public class SyaratPinjaman {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String deskripsi;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pinjaman_id")
    @JsonIgnore
    private Pinjaman pinjaman;

    // Constructors, Getters, dan Setters
    public SyaratPinjaman() {}
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDeskripsi() { return deskripsi; }
    public void setDeskripsi(String deskripsi) { this.deskripsi = deskripsi; }
    public Pinjaman getPinjaman() { return pinjaman; }
    public void setPinjaman(Pinjaman pinjaman) { this.pinjaman = pinjaman; }
}