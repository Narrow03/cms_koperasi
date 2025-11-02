package com.koperasiProject.admin.service;

import com.koperasiProject.admin.model.Berita;
import com.koperasiProject.admin.repository.BeritaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BeritaService {

    @Autowired
    private BeritaRepository beritaRepository;

    @Transactional
    public Berita createBerita(Berita berita) {
        return beritaRepository.save(berita);
    }

    @Transactional(readOnly = true)
    public List<Berita> getAllBerita() {
        return beritaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Berita> getBeritaById(Long id) {
        return beritaRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Berita> getBeritaBySlug(String slug) {
        return beritaRepository.findBySlug(slug);
    }

    @Transactional
    public Berita updateBerita(Long id, Berita beritaDetails) {
        Berita berita = beritaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Berita tidak ditemukan dengan id: " + id));
        
        berita.setJudul(beritaDetails.getJudul());
        berita.setSlug(beritaDetails.getSlug());
        berita.setDeskripsiSingkat(beritaDetails.getDeskripsiSingkat());
        berita.setKonten(beritaDetails.getKonten());
        berita.setUrlGambar(beritaDetails.getUrlGambar());
        berita.setTanggalBerita(beritaDetails.getTanggalBerita());
        
        return beritaRepository.save(berita);
    }

    @Transactional
    public void deleteBerita(Long id) {
        beritaRepository.deleteById(id);
    }
}