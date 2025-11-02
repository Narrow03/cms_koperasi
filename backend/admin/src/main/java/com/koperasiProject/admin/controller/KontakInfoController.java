package com.koperasiProject.admin.controller;
// ... (Lengkapi import)
import com.koperasiProject.admin.model.KontakInfo;
import com.koperasiProject.admin.service.KontakInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/kontak-info")
public class KontakInfoController {
    @Autowired private KontakInfoService kontakInfoService;
    @GetMapping public KontakInfo getKontakInfo() { return kontakInfoService.getKontakInfo(); }
    @PutMapping public KontakInfo updateKontakInfo(@RequestBody KontakInfo kontakInfo) {
        return kontakInfoService.updateKontakInfo(kontakInfo);
    }
}