package com.koperasiProject.admin.service;

import com.koperasiProject.admin.model.Simpanan;
import com.koperasiProject.admin.repository.SimpananRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Import ini

import java.util.List;
import java.util.Optional;

@Service
public class SimpananService {

    @Autowired
    private SimpananRepository simpananRepository;

    // CREATE
    @Transactional
    public Simpanan createSimpanan(Simpanan simpanan) {
        simpanan.getSyarat().forEach(syarat -> syarat.setSimpanan(simpanan));
        simpanan.getBenefit().forEach(benefit -> benefit.setSimpanan(simpanan));
        return simpananRepository.save(simpanan);
    }

    // READ (Get All) - Tetap Transactional untuk konsistensi
    @Transactional(readOnly = true) // TAMBAHKAN INI
    public List<Simpanan> getAllSimpanan() {
        return simpananRepository.findAll();
    }

    // READ (Get by ID)
    @Transactional(readOnly = true) // TAMBAHKAN INI
    public Optional<Simpanan> getSimpananById(Long id) {
        return simpananRepository.findById(id);
    }

    // READ (Get by Slug) - Paling Penting untuk halaman detail Anda
    @Transactional(readOnly = true) // TAMBAHKAN INI
    public Optional<Simpanan> getSimpananBySlug(String slug) {
        return simpananRepository.findBySlug(slug);
    }

    // UPDATE
    @Transactional
    public Simpanan updateSimpanan(Long id, Simpanan simpananDetails) {
        Simpanan existingSimpanan = simpananRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Simpanan tidak ditemukan dengan id: " + id));

        // ... (sisa kode update tetap sama)
        existingSimpanan.setNama(simpananDetails.getNama());
        existingSimpanan.setSlug(simpananDetails.getSlug());
        existingSimpanan.setUrlGambar(simpananDetails.getUrlGambar());
        existingSimpanan.setDeskripsi(simpananDetails.getDeskripsi());

        existingSimpanan.getSyarat().clear();
        simpananDetails.getSyarat().forEach(syarat -> {
            syarat.setSimpanan(existingSimpanan);
            existingSimpanan.getSyarat().add(syarat);
        });

        existingSimpanan.getBenefit().clear();
        simpananDetails.getBenefit().forEach(benefit -> {
            benefit.setSimpanan(existingSimpanan);
            existingSimpanan.getBenefit().add(benefit);
        });

        return simpananRepository.save(existingSimpanan);
    }

    // DELETE
    @Transactional
    public void deleteSimpanan(Long id) {
        if (!simpananRepository.existsById(id)) {
            throw new RuntimeException("Simpanan tidak ditemukan dengan id: " + id);
        }
        simpananRepository.deleteById(id);
    }
}