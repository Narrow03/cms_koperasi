package com.koperasiProject.admin.service;
// ... (Lengkapi import)
import com.koperasiProject.admin.model.Faq;
import com.koperasiProject.admin.repository.FaqRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class FaqService {
    @Autowired private FaqRepository faqRepository;
    public List<Faq> getAllFaqs() { return faqRepository.findAll(); }
    public Optional<Faq> getFaqById(Long id) { return faqRepository.findById(id); }
    public Faq saveFaq(Faq faq) { return faqRepository.save(faq); }
    public void deleteFaq(Long id) { faqRepository.deleteById(id); }
}