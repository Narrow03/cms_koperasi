package com.koperasiProject.admin.config;

import com.koperasiProject.admin.service.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

   @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance(); 
    }

    // =====================================================================
    // 2. AUTHENTICATION PROVIDER
    // Menghubungkan Spring Security dengan CustomUserDetailsService (Database)
    // =====================================================================
    @Bean
    public DaoAuthenticationProvider authenticationProvider(CustomUserDetailsService userDetailsService) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        
        // Memberi tahu Security cara mengambil user dari DB
        authProvider.setUserDetailsService(userDetailsService);
        
        // Memberi tahu Security cara mencocokkan password
        authProvider.setPasswordEncoder(passwordEncoder());
        
        return authProvider;
    }

    // =====================================================================
    // 3. SECURITY FILTER CHAIN (Aturan Akses URL)
    // =====================================================================
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, CustomUserDetailsService userDetailsService) throws Exception {
        http
            .cors(withDefaults()) 
            .csrf(csrf -> csrf.disable()) 
            .authorizeHttpRequests(auth -> auth
                
                // PERBAIKAN 1: Izinkan SEMUA request OPTIONS (Penting untuk CORS React)
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // A. Aset Statis
                .requestMatchers("/images/**", "/api/files/**").permitAll()
                
                // B. Form Lamaran Kerja
                .requestMatchers(HttpMethod.POST, "/api/lamaran", "/api/lamaran/**").permitAll() 
                
                // C. Data Publik Website Utama (Hanya GET/Baca)
                // PERBAIKAN 2: Masukkan versi tanpa /** dan dengan /**
                .requestMatchers(HttpMethod.GET,
                    "/api/statistik", "/api/statistik/**",
                    "/api/kontak-info", "/api/kontak-info/**",
                    "/api/pengurus", "/api/pengurus/**",
                    "/api/testimonials", "/api/testimonials/**",
                    "/api/simpanan", "/api/simpanan/**",
                    "/api/pinjaman", "/api/pinjaman/**",
                    "/api/berita", "/api/berita/**",
                    "/api/galeri", "/api/galeri/**",
                    "/api/karir", "/api/karir/**",
                    "/api/faq", "/api/faq/**",
                    "/api/slides", "/api/slides/**"
                ).permitAll()

                // D. Endpoint Login khusus (Agar tidak terblokir saat admin mau masuk)
                .requestMatchers("/api/auth/**", "/api/login").permitAll()

                // E. Sisanya -> WAJIB LOGIN
                .anyRequest().authenticated() 
            )
            .authenticationProvider(authenticationProvider(userDetailsService))
            .httpBasic(withDefaults());

        return http.build();
    }
    
    // =====================================================================
    // 4. KONFIGURASI CORS
    // Mengizinkan Frontend (React) berbicara dengan Backend
    // =====================================================================
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Daftar asal website yang diizinkan (Sesuaikan port frontend Anda)
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:5173", // Frontend Public
            "http://localhost:5174", // Frontend CMS Admin
            "http://127.0.0.1:5173",
            "http://127.0.0.1:5174",
            "http://192.168.1.6:5173"
            // Tambahkan IP network lain jika perlu, misal: "http://192.168.1.10:5173"
        ));
        
        // Metode HTTP yang diizinkan
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Header yang diizinkan
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        
        // Terapkan ke semua endpoint
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}