package com.koperasiProject.admin.repository;

import com.koperasiProject.admin.model.KontakInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KontakInfoRepository extends JpaRepository<KontakInfo, Long> {
}