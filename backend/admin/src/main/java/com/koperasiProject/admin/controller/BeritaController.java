package com.koperasiProject.admin.controller;

import com.koperasiProject.admin.model.Berita;
import com.koperasiProject.admin.service.BeritaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/berita")
public class BeritaController {

    @Autowired
    private BeritaService beritaService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Berita createBerita(@RequestBody Berita berita) {
        return beritaService.createBerita(berita);
    }

    @GetMapping
    public List<Berita> getAllBerita() {
        return beritaService.getAllBerita();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Berita> getBeritaById(@PathVariable Long id) {
        return beritaService.getBeritaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<Berita> getBeritaBySlug(@PathVariable String slug) {
        return beritaService.getBeritaBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Berita updateBerita(@PathVariable Long id, @RequestBody Berita beritaDetails) {
        return beritaService.updateBerita(id, beritaDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBerita(@PathVariable Long id) {
        beritaService.deleteBerita(id);
        return ResponseEntity.noContent().build();
    }
}