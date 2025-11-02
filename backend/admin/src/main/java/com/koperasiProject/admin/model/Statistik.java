package com.koperasiProject.admin.model;

import jakarta.persistence.*;

@Entity
@Table(name = "statistik")
public class Statistik {

    @Id
    private Long id = 1L; // ID Tetap

    private String totalAnggota; // Simpan sebagai String agar fleksibel (misal: "20.000+")
    private String totalCabang;
    private String totalKas;     // Misal: "Rp 10 Miliar"

    public Statistik() {}

    // --- Getters and Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = 1L; } // Pastikan ID selalu 1
    public String getTotalAnggota() { return totalAnggota; }
    public void setTotalAnggota(String totalAnggota) { this.totalAnggota = totalAnggota; }
    public String getTotalCabang() { return totalCabang; }
    public void setTotalCabang(String totalCabang) { this.totalCabang = totalCabang; }
    public String getTotalKas() { return totalKas; }
    public void setTotalKas(String totalKas) { this.totalKas = totalKas; }
}