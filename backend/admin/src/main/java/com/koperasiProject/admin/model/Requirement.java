package com.koperasiProject.admin.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "requirement")
public class Requirement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String deskripsi;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "karir_id")
    @JsonIgnore
    private Karir karir;
    
    public Requirement() {}

    // --- Getters and Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDeskripsi() { return deskripsi; }
    public void setDeskripsi(String deskripsi) { this.deskripsi = deskripsi; }
    public Karir getKarir() { return karir; }
    public void setKarir(Karir karir) { this.karir = karir; }
}