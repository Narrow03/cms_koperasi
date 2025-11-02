package com.koperasiProject.admin.service;
// ... (Lengkapi import)
import com.koperasiProject.admin.model.KontakInfo;
import com.koperasiProject.admin.repository.KontakInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KontakInfoService {
    @Autowired private KontakInfoRepository kontakInfoRepository;

    public KontakInfo getKontakInfo() {
        // Ambil info kontak dengan ID 1, atau buat baru jika tidak ada
        return kontakInfoRepository.findById(1L).orElseGet(() -> {
            KontakInfo newInfo = new KontakInfo();
            return kontakInfoRepository.save(newInfo);
        });
    }

    public KontakInfo updateKontakInfo(KontakInfo infoDetails) {
        KontakInfo info = getKontakInfo();
        info.setPhone(infoDetails.getPhone());
        info.setEmail(infoDetails.getEmail());
        info.setAddress(infoDetails.getAddress());
        info.setFacebookUrl(infoDetails.getFacebookUrl());
        info.setInstagramUrl(infoDetails.getInstagramUrl());
        info.setYoutubeUrl(infoDetails.getYoutubeUrl());
        info.setGoogleMapsUrl(infoDetails.getGoogleMapsUrl());
        return kontakInfoRepository.save(info);
    }
}