package com.koperasiProject.admin.service;

import com.koperasiProject.admin.model.Simpanan;
import com.koperasiProject.admin.repository.SimpananRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Import ini
import java.util.List;
import java.util.Optional;

@Service
@Transactional
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
    @Transactional(readOnly = true) 
    public Optional<Simpanan> getSimpananById(Long id) {
        return simpananRepository.findById(id);
    }

    // READ (Get by Slug)
    @Transactional(readOnly = true) 
    public Optional<Simpanan> getSimpananBySlug(String slug) {
        return simpananRepository.findBySlug(slug);
    }

    // UPDATE
    @Transactional
    public Simpanan updateSimpanan(Long id, Simpanan simpananDetails) {
        Simpanan existingSimpanan = simpananRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Simpanan tidak ditemukan dengan id: " + id));
                
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

    // Cek untuk Create
    public boolean existsBySlug(String slug) {
        return simpananRepository.existsBySlug(slug);
    }

    // Cek untuk Update (Penting!)
    public boolean isSlugTakenByOthers(String slug, Long id) {
        return simpananRepository.findBySlug(slug)
                .map(s -> !s.getId().equals(id)) // Jika ada slug sama tapi ID berbeda, berarti "diambil orang lain"
                .orElse(false); // Jika tidak ada slug sama, berarti aman
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