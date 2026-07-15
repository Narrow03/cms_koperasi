package com.koperasiProject.admin.repository;

import com.koperasiProject.admin.model.Simpanan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


@Repository
public interface SimpananRepository extends JpaRepository<Simpanan, Long> {
    Optional<Simpanan> findBySlug(String slug); 
    boolean existsBySlug(String slug);
}