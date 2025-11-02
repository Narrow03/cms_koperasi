package com.koperasiProject.admin.service;

import com.koperasiProject.admin.model.Galeri;
import com.koperasiProject.admin.repository.GaleriRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class GaleriService {

    @Autowired
    private GaleriRepository galeriRepository;

    @Transactional
    public Galeri createGaleri(Galeri galeri) {
        galeri.getDaftarGambar().forEach(gambar -> gambar.setGaleri(galeri));
        return galeriRepository.save(galeri);
    }

    @Transactional(readOnly = true)
    public List<Galeri> getAllGaleri() {
        return galeriRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Galeri> getGaleriById(Long id) {
        return galeriRepository.findById(id);
    }

    @Transactional
    public Galeri updateGaleri(Long id, Galeri galeriDetails) {
        Galeri existingGaleri = galeriRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Galeri tidak ditemukan dengan id: " + id));

        existingGaleri.setJudul(galeriDetails.getJudul());
        existingGaleri.setDeskripsi(galeriDetails.getDeskripsi());
        
        existingGaleri.getDaftarGambar().clear();
        galeriDetails.getDaftarGambar().forEach(gambar -> {
            gambar.setGaleri(existingGaleri);
            existingGaleri.getDaftarGambar().add(gambar);
        });

        return galeriRepository.save(existingGaleri);
    }

    @Transactional
    public void deleteGaleri(Long id) {
        galeriRepository.deleteById(id);
    }
}