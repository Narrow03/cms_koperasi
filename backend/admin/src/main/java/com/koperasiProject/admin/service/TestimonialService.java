package com.koperasiProject.admin.service;
// ... (Lengkapi import)
import com.koperasiProject.admin.model.Testimonial;
import com.koperasiProject.admin.repository.TestimonialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TestimonialService {
    @Autowired private TestimonialRepository testimonialRepository;

    public List<Testimonial> getAllTestimonials() { return testimonialRepository.findAll(); }
    public Optional<Testimonial> getTestimonialById(Long id) { return testimonialRepository.findById(id); }
    public Testimonial saveTestimonial(Testimonial testimonial) { return testimonialRepository.save(testimonial); }
    public void deleteTestimonial(Long id) { testimonialRepository.deleteById(id); }
}