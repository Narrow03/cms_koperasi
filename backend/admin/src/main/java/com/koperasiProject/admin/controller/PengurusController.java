package com.koperasiProject.admin.controller;
// ... (Lengkapi import)
import com.koperasiProject.admin.model.Pengurus;
import com.koperasiProject.admin.service.PengurusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pengurus")
public class PengurusController {
    @Autowired private PengurusService pengurusService;

    // Endpoint untuk mengambil semua pengurus (untuk CMS)
    @GetMapping
    public List<Pengurus> getAllPengurus() { return pengurusService.getAllPengurus(); }
    
    // Endpoint untuk website publik (mengambil berdasarkan tipe)
    @GetMapping("/tipe/{tipe}")
    public List<Pengurus> getPengurusByTipe(@PathVariable String tipe) {
        return pengurusService.getPengurusByTipe(tipe);
    }
    
    @PostMapping public Pengurus createPengurus(@RequestBody Pengurus pengurus) { return pengurusService.savePengurus(pengurus); }

    @GetMapping("/{id}")
    public ResponseEntity<Pengurus> getPengurusById(@PathVariable Long id) {
        return pengurusService.getPengurusById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Pengurus updatePengurus(@PathVariable Long id, @RequestBody Pengurus pengurusDetails) {
        Pengurus pengurus = pengurusService.getPengurusById(id).orElseThrow(() -> new RuntimeException("Pengurus not found"));
        pengurus.setNama(pengurusDetails.getNama());
        pengurus.setJabatan(pengurusDetails.getJabatan());
        pengurus.setBio(pengurusDetails.getBio());
        pengurus.setUrlGambar(pengurusDetails.getUrlGambar());
        pengurus.setTipe(pengurusDetails.getTipe());
        return pengurusService.savePengurus(pengurus);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePengurus(@PathVariable Long id) {
        pengurusService.deletePengurus(id);
        return ResponseEntity.noContent().build();
    }
}