package com.koperasiProject.admin.repository;

import com.koperasiProject.admin.model.Statistik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatistikRepository extends JpaRepository<Statistik, Long> {
}