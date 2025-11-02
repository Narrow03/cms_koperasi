package com.koperasiProject.admin.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "benefit_simpanan")
public class BenefitSimpanan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String deskripsi;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "simpanan_id")
    @JsonIgnore
    private Simpanan simpanan;

    // Constructors, Getters, dan Setters
    public BenefitSimpanan() {}
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDeskripsi() { return deskripsi; }
    public void setDeskripsi(String deskripsi) { this.deskripsi = deskripsi; }
    public Simpanan getSimpanan() { return simpanan; }
    public void setSimpanan(Simpanan simpanan) { this.simpanan = simpanan; }
}