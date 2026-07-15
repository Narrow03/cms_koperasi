package com.koperasiProject.admin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    // Endpoint ini akan dipanggil oleh Frontend saat tombol "Login" ditekan.
    // Karena endpoint ini dilindungi oleh Spring Security (Basic Auth),
    // jika request sampai ke sini, berarti Username & Password SUDAH BENAR.
    @GetMapping("/login")
    public ResponseEntity<Map<String, String>> login() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Login berhasil");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }
}