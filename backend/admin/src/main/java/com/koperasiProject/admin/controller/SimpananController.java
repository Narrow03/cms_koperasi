package com.koperasiProject.admin.controller;

import com.koperasiProject.admin.model.Simpanan;
import com.koperasiProject.admin.service.SimpananService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/simpanan")
public class SimpananController {

    @Autowired
    private SimpananService simpananService;

    // CREATE
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Simpanan createSimpanan(@RequestBody Simpanan simpanan) {
        return simpananService.createSimpanan(simpanan);
    }

    // READ (Get All)
    @GetMapping
    public List<Simpanan> getAllSimpanan() {
        return simpananService.getAllSimpanan();
    }

    // READ (Get by ID)
    @GetMapping("/{id}")
    public ResponseEntity<Simpanan> getSimpananById(@PathVariable Long id) {
        return simpananService.getSimpananById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE
    @PutMapping("/{id}")
    public Simpanan updateSimpanan(@PathVariable Long id, @RequestBody Simpanan simpananDetails) {
        return simpananService.updateSimpanan(id, simpananDetails);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSimpanan(@PathVariable Long id) {
        simpananService.deleteSimpanan(id);
        return ResponseEntity.noContent().build();
    }

    // READ (Get by Slug) -> GET http://localhost:8080/api/simpanan/slug/sibuhar
@GetMapping("/slug/{slug}")
public ResponseEntity<Simpanan> getSimpananBySlug(@PathVariable String slug) {
    return simpananService.getSimpananBySlug(slug)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}
}