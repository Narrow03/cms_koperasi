package com.koperasiProject.admin.repository;

import com.koperasiProject.admin.model.Berita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BeritaRepository extends JpaRepository<Berita, Long> {
    Optional<Berita> findBySlug(String slug);
}