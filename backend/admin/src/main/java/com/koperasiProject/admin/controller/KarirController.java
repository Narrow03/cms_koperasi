package com.koperasiProject.admin.controller;

import com.koperasiProject.admin.model.Karir;
import com.koperasiProject.admin.service.KarirService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/karir")
public class KarirController {

    @Autowired
    private KarirService karirService;

    /**
     * CREATE: Membuat lowongan karir baru.
     * @param karir Data karir dari body request.
     * @return Data karir yang telah disimpan.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Karir createKarir(@RequestBody Karir karir) {
        return karirService.saveKarir(karir);
    }

    /**
     * READ: Mengambil semua data lowongan karir.
     * @return List semua lowongan karir.
     */
    @GetMapping
    public List<Karir> getAllKarir() {
        return karirService.getAllKarir();
    }

    /**
     * READ: Mengambil satu data lowongan karir berdasarkan ID.
     * @param id ID dari karir yang dicari.
     * @return Data karir atau status 404 Not Found.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Karir> getKarirById(@PathVariable Long id) {
        return karirService.getKarirById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * UPDATE: Memperbarui data lowongan karir yang sudah ada.
     * @param id ID dari karir yang akan di-update.
     * @param karirDetails Data baru dari body request.
     * @return Data karir yang telah diperbarui.
     */
    @PutMapping("/{id}")
    public Karir updateKarir(@PathVariable Long id, @RequestBody Karir karirDetails) {
        // Service akan menangani logika untuk mencari dan memperbarui data
        return karirService.saveKarir(karirDetails); 
    }

    /**
     * DELETE: Menghapus data lowongan karir berdasarkan ID.
     * @param id ID dari karir yang akan dihapus.
     * @return Status 204 No Content jika berhasil.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKarir(@PathVariable Long id) {
        karirService.deleteKarir(id);
        return ResponseEntity.noContent().build();
    }
}