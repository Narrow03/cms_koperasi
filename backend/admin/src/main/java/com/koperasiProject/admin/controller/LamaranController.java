package com.koperasiProject.admin.controller;
// ... (Lengkapi import)
import com.koperasiProject.admin.model.Lamaran;
import com.koperasiProject.admin.service.FileStorageService;
import com.koperasiProject.admin.service.LamaranService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/lamaran")
public class LamaranController {

    @Autowired private LamaranService lamaranService;
    @Autowired private FileStorageService fileStorageService;

    @PostMapping(consumes = {"multipart/form-data"})
    public Lamaran createLamaran(@RequestParam("posisi") String posisi,
                                 @RequestParam("nama") String nama,
                                 @RequestParam("email") String email,
                                 @RequestParam("phone") String phone,
                                 @RequestParam("resume") MultipartFile resume) {
        String namaFileResume = fileStorageService.storeFile(resume);
        return lamaranService.saveLamaran(posisi, nama, email, phone, namaFileResume);
    }
    
    // Endpoint untuk CMS melihat semua lamaran
    @GetMapping
    public List<Lamaran> getAllLamaran() {
        return lamaranService.getAllLamaran();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLamaran(@PathVariable Long id) {
    lamaranService.deleteLamaran(id);
    return ResponseEntity.noContent().build();
    }
    
}