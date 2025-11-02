package com.koperasiProject.admin.controller;
// ... (Lengkapi import)
import com.koperasiProject.admin.model.Testimonial;
import com.koperasiProject.admin.service.TestimonialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {
    @Autowired private TestimonialService testimonialService;

    @GetMapping public List<Testimonial> getAllTestimonials() { return testimonialService.getAllTestimonials(); }
    @PostMapping public Testimonial createTestimonial(@RequestBody Testimonial testimonial) { return testimonialService.saveTestimonial(testimonial); }
    
    @GetMapping("/{id}")
    public ResponseEntity<Testimonial> getTestimonialById(@PathVariable Long id) {
        return testimonialService.getTestimonialById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Testimonial updateTestimonial(@PathVariable Long id, @RequestBody Testimonial testimonialDetails) {
        Testimonial testimonial = testimonialService.getTestimonialById(id).orElseThrow(() -> new RuntimeException("Testimonial not found"));
        testimonial.setCategory(testimonialDetails.getCategory());
        testimonial.setReview(testimonialDetails.getReview());
        testimonial.setFullReview(testimonialDetails.getFullReview());
        testimonial.setAuthor(testimonialDetails.getAuthor());
        testimonial.setRole(testimonialDetails.getRole());
        testimonial.setUrlGambar(testimonialDetails.getUrlGambar());
        return testimonialService.saveTestimonial(testimonial);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestimonial(@PathVariable Long id) {
        testimonialService.deleteTestimonial(id);
        return ResponseEntity.noContent().build();
    }
}