package com.koperasiProject.admin.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "karir")
public class Karir {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String posisi;

    @Column(nullable = false)
    private String divisi;
    
    @Column(columnDefinition = "TEXT")
    private String deskripsiSingkat;

    @OneToMany(mappedBy = "karir", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<JobDescription> jobDescriptions = new ArrayList<>();

    @OneToMany(mappedBy = "karir", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Requirement> requirements = new ArrayList<>();

    @OneToMany(mappedBy = "karir", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Benefit> benefits = new ArrayList<>();

    public Karir() {}

    // --- Getters and Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getPosisi() { return posisi; }
    public void setPosisi(String posisi) { this.posisi = posisi; }
    public String getDivisi() { return divisi; }
    public void setDivisi(String divisi) { this.divisi = divisi; }
    public String getDeskripsiSingkat() { return deskripsiSingkat; }
    public void setDeskripsiSingkat(String deskripsiSingkat) { this.deskripsiSingkat = deskripsiSingkat; }
    public List<JobDescription> getJobDescriptions() { return jobDescriptions; }
    public void setJobDescriptions(List<JobDescription> jobDescriptions) { this.jobDescriptions = jobDescriptions; }
    public List<Requirement> getRequirements() { return requirements; }
    public void setRequirements(List<Requirement> requirements) { this.requirements = requirements; }
    public List<Benefit> getBenefits() { return benefits; }
    public void setBenefits(List<Benefit> benefits) { this.benefits = benefits; }
}