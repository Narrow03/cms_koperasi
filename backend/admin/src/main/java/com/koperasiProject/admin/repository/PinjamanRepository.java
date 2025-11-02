package com.koperasiProject.admin.repository;

import com.koperasiProject.admin.model.Pinjaman;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PinjamanRepository extends JpaRepository<Pinjaman, Long> {
    Optional<Pinjaman> findBySlug(String slug);
}