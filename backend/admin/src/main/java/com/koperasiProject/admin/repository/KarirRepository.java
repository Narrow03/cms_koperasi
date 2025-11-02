package com.koperasiProject.admin.repository;

import com.koperasiProject.admin.model.Karir;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KarirRepository extends JpaRepository<Karir, Long> {
    // Spring Data JPA akan secara otomatis menyediakan semua metode dasar
    // seperti findAll(), findById(), save(), deleteById(), dll.
    // Anda tidak perlu menulis apa-apa di sini untuk CRUD dasar.
}