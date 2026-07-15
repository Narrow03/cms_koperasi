package com.koperasiProject.admin.repository;

import com.koperasiProject.admin.model.Berita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List; // Tambahkan import ini
import java.util.Optional;

@Repository
public interface BeritaRepository extends JpaRepository<Berita, Long> {
    
    // Logika Utama: Ambil semua berita, urutkan dari tanggal terbaru ke terlama
    List<Berita> findAllByOrderByTanggalBeritaDesc();

    Optional<Berita> findBySlug(String slug);
}