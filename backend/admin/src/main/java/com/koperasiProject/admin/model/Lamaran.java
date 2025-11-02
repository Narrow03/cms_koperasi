package com.koperasiProject.admin.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "lamaran")
public class Lamaran {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String posisi;

    @Column(nullable = false)
    private String nama;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;
    
    @Column(nullable = false)
    private String namaFileResume;

    @Column(name = "tanggal_lamaran")
    private LocalDateTime tanggalLamaran;

    public Lamaran() {}

    // --- Getters and Setters ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPosisi() {
        return posisi;
    }

    public void setPosisi(String posisi) {
        this.posisi = posisi;
    }

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getNamaFileResume() {
        return namaFileResume;
    }

    public void setNamaFileResume(String namaFileResume) {
        this.namaFileResume = namaFileResume;
    }

    public LocalDateTime getTanggalLamaran() {
        return tanggalLamaran;
    }

    public void setTanggalLamaran(LocalDateTime tanggalLamaran) {
        this.tanggalLamaran = tanggalLamaran;
    }
}