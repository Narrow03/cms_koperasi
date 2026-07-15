package com.koperasiProject.admin.service;

import com.koperasiProject.admin.model.Karir;
import com.koperasiProject.admin.repository.KarirRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class KarirService {

    @Autowired
    private KarirRepository karirRepository;

    /**
     * Digunakan untuk POST (Tambah Baru).
     */
    @Transactional
    public Karir saveKarir(Karir karir) {
        if (karir.getJobDescriptions() != null) 
            karir.getJobDescriptions().forEach(jd -> jd.setKarir(karir));
        if (karir.getRequirements() != null) 
            karir.getRequirements().forEach(req -> req.setKarir(karir));
        if (karir.getBenefits() != null) 
            karir.getBenefits().forEach(ben -> ben.setKarir(karir));
        
        return karirRepository.save(karir);
    }

    /**
     * Digunakan untuk PUT (Update).
     * Solusi untuk error 'detached entity passed to persist'.
     */
    @Transactional
    public Karir updateKarir(Long id, Karir updatedKarir) {
        // 1. Ambil data asli dari database
        Karir existingKarir = karirRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Karir tidak ditemukan dengan id: " + id));

        // 2. Update field utama (Non-List)
        existingKarir.setPosisi(updatedKarir.getPosisi());
        existingKarir.setDivisi(updatedKarir.getDivisi());
        existingKarir.setDeskripsiSingkat(updatedKarir.getDeskripsiSingkat());

        // 3. Update koleksi Job Descriptions
        existingKarir.getJobDescriptions().clear(); // Hapus yang lama (Orphan Removal)
        if (updatedKarir.getJobDescriptions() != null) {
            updatedKarir.getJobDescriptions().forEach(jd -> {
                jd.setKarir(existingKarir);
                existingKarir.getJobDescriptions().add(jd);
            });
        }

        // 4. Update koleksi Requirements
        existingKarir.getRequirements().clear();
        if (updatedKarir.getRequirements() != null) {
            updatedKarir.getRequirements().forEach(req -> {
                req.setKarir(existingKarir);
                existingKarir.getRequirements().add(req);
            });
        }

        // 5. Update koleksi Benefits
        existingKarir.getBenefits().clear();
        if (updatedKarir.getBenefits() != null) {
            updatedKarir.getBenefits().forEach(ben -> {
                ben.setKarir(existingKarir);
                existingKarir.getBenefits().add(ben);
            });
        }

        // 6. Simpan kembali data yang sudah digabungkan (Merge)
        return karirRepository.save(existingKarir);
    }

    @Transactional(readOnly = true)
    public List<Karir> getAllKarir() {
        return karirRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Karir> getKarirById(Long id) {
        return karirRepository.findById(id);
    }

    @Transactional
    public void deleteKarir(Long id) {
        if (!karirRepository.existsById(id)) {
            throw new RuntimeException("Karir tidak ditemukan dengan id: " + id);
        }
        karirRepository.deleteById(id);
    }
}