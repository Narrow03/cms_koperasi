package com.koperasiProject.admin.service;

import com.koperasiProject.admin.model.Statistik;
import com.koperasiProject.admin.repository.StatistikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StatistikService {

    @Autowired
    private StatistikRepository statistikRepository;

    @Transactional(readOnly = true)
    public Statistik getStatistik() {
        // Ambil data dengan ID 1, atau buat baru jika belum ada
        return statistikRepository.findById(1L).orElseGet(() -> {
            Statistik newStats = new Statistik();
            // Anda bisa set nilai default awal di sini jika mau
            // newStats.setTotalAnggota("0");
            // newStats.setTotalCabang("0");
            // newStats.setTotalKas("Rp 0");
            return statistikRepository.save(newStats);
        });
    }

    @Transactional
    public Statistik updateStatistik(Statistik statistikDetails) {
        Statistik stats = getStatistik(); // Ambil atau buat data yang ada
        stats.setTotalAnggota(statistikDetails.getTotalAnggota());
        stats.setTotalCabang(statistikDetails.getTotalCabang());
        stats.setTotalKas(statistikDetails.getTotalKas());
        return statistikRepository.save(stats);
    }
}