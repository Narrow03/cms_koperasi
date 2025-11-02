package com.koperasiProject.admin.repository;

import com.koperasiProject.admin.model.Galeri;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GaleriRepository extends JpaRepository<Galeri, Long> {
}