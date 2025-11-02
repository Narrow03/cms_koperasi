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
     * Menyimpan data karir baru atau memperbarui yang sudah ada.
     * Metode ini juga mengatur relasi dua arah ke entitas anak.
     * @param karir Objek karir yang akan disimpan.
     * @return Entitas karir yang telah disimpan.
     */
    @Transactional
    public Karir saveKarir(Karir karir) {
        // Set referensi 'karir' pada setiap item di list anak
        karir.getJobDescriptions().forEach(jd -> jd.setKarir(karir));
        karir.getRequirements().forEach(req -> req.setKarir(karir));
        karir.getBenefits().forEach(ben -> ben.setKarir(karir));
        
        return karirRepository.save(karir);
    }

    /**
     * Mengambil semua data lowongan karir.
     * @return List semua entitas karir.
     */
    @Transactional(readOnly = true)
    public List<Karir> getAllKarir() {
        return karirRepository.findAll();
    }

    /**
     * Mengambil satu data lowongan karir berdasarkan ID.
     * @param id ID dari karir yang dicari.
     * @return Optional yang berisi entitas karir jika ditemukan.
     */
    @Transactional(readOnly = true)
    public Optional<Karir> getKarirById(Long id) {
        return karirRepository.findById(id);
    }

    /**
     * Menghapus data lowongan karir berdasarkan ID.
     * @param id ID dari karir yang akan dihapus.
     */
    @Transactional
    public void deleteKarir(Long id) {
        if (!karirRepository.existsById(id)) {
            throw new RuntimeException("Karir tidak ditemukan dengan id: " + id);
        }
        karirRepository.deleteById(id);
    }
}