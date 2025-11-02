package com.koperasiProject.admin.service;
// ... (Lengkapi import)
import com.koperasiProject.admin.model.Lamaran;
import com.koperasiProject.admin.repository.LamaranRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LamaranService {
    @Autowired private LamaranRepository lamaranRepository;

    public Lamaran saveLamaran(String posisi, String nama, String email, String phone, String namaFileResume) {
        Lamaran lamaran = new Lamaran();
        lamaran.setPosisi(posisi);
        lamaran.setNama(nama);
        lamaran.setEmail(email);
        lamaran.setPhone(phone);
        lamaran.setNamaFileResume(namaFileResume);
        lamaran.setTanggalLamaran(LocalDateTime.now());
        return lamaranRepository.save(lamaran);
    }
    
    public List<Lamaran> getAllLamaran() {
        return lamaranRepository.findAll();
    }
    
    public void deleteLamaran(Long id) {
    // Di sini Anda juga bisa menambahkan logika untuk menghapus file resume dari disk
    lamaranRepository.deleteById(id);
}
}