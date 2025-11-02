package com.koperasiProject.admin.controller;

import com.koperasiProject.admin.model.Statistik;
import com.koperasiProject.admin.service.StatistikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/statistik")
public class StatistikController {

    @Autowired
    private StatistikService statistikService;

    // Endpoint untuk mengambil data statistik (untuk website publik & CMS)
    @GetMapping
    public Statistik getStatistik() {
        return statistikService.getStatistik();
    }

    // Endpoint untuk memperbarui data statistik (hanya untuk CMS)
    @PutMapping
    public Statistik updateStatistik(@RequestBody Statistik statistikDetails) {
        return statistikService.updateStatistik(statistikDetails);
    }
}