package com.koperasiProject.admin.controller;

import com.koperasiProject.admin.model.Pinjaman;
import com.koperasiProject.admin.service.PinjamanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pinjaman")
public class PinjamanController {

    @Autowired
    private PinjamanService pinjamanService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Pinjaman createPinjaman(@RequestBody Pinjaman pinjaman) {
        return pinjamanService.createPinjaman(pinjaman);
    }

    @GetMapping
    public List<Pinjaman> getAllPinjaman() {
        return pinjamanService.getAllPinjaman();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pinjaman> getPinjamanById(@PathVariable Long id) {
        return pinjamanService.getPinjamanById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/slug/{slug}")
    public ResponseEntity<Pinjaman> getPinjamanBySlug(@PathVariable String slug) {
        return pinjamanService.getPinjamanBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Pinjaman updatePinjaman(@PathVariable Long id, @RequestBody Pinjaman pinjamanDetails) {
        return pinjamanService.updatePinjaman(id, pinjamanDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePinjaman(@PathVariable Long id) {
        pinjamanService.deletePinjaman(id);
        return ResponseEntity.noContent().build();
    }
}