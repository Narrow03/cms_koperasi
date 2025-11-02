package com.koperasiProject.admin.service;

import com.koperasiProject.admin.model.Pinjaman;
import com.koperasiProject.admin.repository.PinjamanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PinjamanService {

    @Autowired
    private PinjamanRepository pinjamanRepository;

    @Transactional
    public Pinjaman createPinjaman(Pinjaman pinjaman) {
        pinjaman.getSyarat().forEach(syarat -> syarat.setPinjaman(pinjaman));
        pinjaman.getBenefit().forEach(benefit -> benefit.setPinjaman(pinjaman));
        return pinjamanRepository.save(pinjaman);
    }

    @Transactional(readOnly = true)
    public List<Pinjaman> getAllPinjaman() {
        return pinjamanRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Pinjaman> getPinjamanById(Long id) {
        return pinjamanRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Pinjaman> getPinjamanBySlug(String slug) {
        return pinjamanRepository.findBySlug(slug);
    }

    @Transactional
    public Pinjaman updatePinjaman(Long id, Pinjaman pinjamanDetails) {
        Pinjaman existingPinjaman = pinjamanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pinjaman tidak ditemukan dengan id: " + id));

        existingPinjaman.setNama(pinjamanDetails.getNama());
        existingPinjaman.setSlug(pinjamanDetails.getSlug());
        existingPinjaman.setUrlGambar(pinjamanDetails.getUrlGambar());
        existingPinjaman.setDeskripsi(pinjamanDetails.getDeskripsi());

        existingPinjaman.getSyarat().clear();
        pinjamanDetails.getSyarat().forEach(syarat -> {
            syarat.setPinjaman(existingPinjaman);
            existingPinjaman.getSyarat().add(syarat);
        });

        existingPinjaman.getBenefit().clear();
        pinjamanDetails.getBenefit().forEach(benefit -> {
            benefit.setPinjaman(existingPinjaman);
            existingPinjaman.getBenefit().add(benefit);
        });

        return pinjamanRepository.save(existingPinjaman);
    }

    @Transactional
    public void deletePinjaman(Long id) {
        if (!pinjamanRepository.existsById(id)) {
            throw new RuntimeException("Pinjaman tidak ditemukan dengan id: " + id);
        }
        pinjamanRepository.deleteById(id);
    }
}