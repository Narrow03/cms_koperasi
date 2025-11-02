package com.koperasiProject.admin.repository;

import com.koperasiProject.admin.model.Lamaran;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LamaranRepository extends JpaRepository<Lamaran, Long> {
}