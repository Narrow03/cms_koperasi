package com.koperasiProject.admin.service;
// ... (Lengkapi import)
import com.koperasiProject.admin.model.Pengurus;
import com.koperasiProject.admin.repository.PengurusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PengurusService {
    @Autowired private PengurusRepository pengurusRepository;

    public List<Pengurus> getAllPengurus() { return pengurusRepository.findAll(); }
    public List<Pengurus> getPengurusByTipe(String tipe) { return pengurusRepository.findByTipe(tipe); }
    public Optional<Pengurus> getPengurusById(Long id) { return pengurusRepository.findById(id); }
    public Pengurus savePengurus(Pengurus pengurus) { return pengurusRepository.save(pengurus); }
    public void deletePengurus(Long id) { pengurusRepository.deleteById(id); }
}