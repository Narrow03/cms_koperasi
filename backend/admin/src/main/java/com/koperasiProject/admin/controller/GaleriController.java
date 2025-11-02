package com.koperasiProject.admin.controller;

import com.koperasiProject.admin.model.Galeri;
import com.koperasiProject.admin.service.GaleriService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/galeri")
public class GaleriController {

    @Autowired
    private GaleriService galeriService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Galeri createGaleri(@RequestBody Galeri galeri) {
        return galeriService.createGaleri(galeri);
    }

    @GetMapping
    public List<Galeri> getAllGaleri() {
        return galeriService.getAllGaleri();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Galeri> getGaleriById(@PathVariable Long id) {
        return galeriService.getGaleriById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Galeri updateGaleri(@PathVariable Long id, @RequestBody Galeri galeriDetails) {
        return galeriService.updateGaleri(id, galeriDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGaleri(@PathVariable Long id) {
        galeriService.deleteGaleri(id);
        return ResponseEntity.noContent().build();
    }
}