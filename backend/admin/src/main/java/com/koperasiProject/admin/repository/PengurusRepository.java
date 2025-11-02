package com.koperasiProject.admin.repository;

import com.koperasiProject.admin.model.Pengurus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PengurusRepository extends JpaRepository<Pengurus, Long> {
    // Metode kustom untuk mencari berdasarkan tipe
    List<Pengurus> findByTipe(String tipe);
}