package com.koperasiProject.admin.controller;
// ... (Lengkapi import)
import com.koperasiProject.admin.model.Faq;
import com.koperasiProject.admin.service.FaqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/faq")
public class FaqController {
    @Autowired private FaqService faqService;
    @GetMapping public List<Faq> getAllFaqs() { return faqService.getAllFaqs(); }
    @PostMapping public Faq createFaq(@RequestBody Faq faq) { return faqService.saveFaq(faq); }
    @GetMapping("/{id}")
    public ResponseEntity<Faq> getFaqById(@PathVariable Long id) {
        return faqService.getFaqById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    @PutMapping("/{id}")
    public Faq updateFaq(@PathVariable Long id, @RequestBody Faq faqDetails) {
        Faq faq = faqService.getFaqById(id).orElseThrow(() -> new RuntimeException("FAQ not found"));
        faq.setQuestion(faqDetails.getQuestion());
        faq.setAnswer(faqDetails.getAnswer());
        return faqService.saveFaq(faq);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFaq(@PathVariable Long id) {
        faqService.deleteFaq(id);
        return ResponseEntity.noContent().build();
    }
}