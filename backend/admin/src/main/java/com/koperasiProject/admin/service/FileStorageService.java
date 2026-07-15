    package com.koperasiProject.admin.service;

    import org.springframework.core.io.Resource;
    import org.springframework.core.io.UrlResource;
    import org.springframework.stereotype.Service;
    import org.springframework.util.StringUtils;
    import org.springframework.web.multipart.MultipartFile;

    import java.io.IOException;
    import java.net.MalformedURLException;
    import java.nio.file.Files;
    import java.nio.file.Path;
    import java.nio.file.Paths;
    import java.nio.file.StandardCopyOption;

    @Service
    public class FileStorageService {
        private final Path fileStorageLocation;

        // 1. Constructor untuk setup folder penyimpanan
        public FileStorageService() {
            // Tentukan folder untuk menyimpan resume di root direktori proyek backend
            this.fileStorageLocation = Paths.get("uploads/resumes").toAbsolutePath().normalize();
            try {
                Files.createDirectories(this.fileStorageLocation);
            } catch (Exception ex) {
                throw new RuntimeException("Tidak dapat membuat direktori untuk menyimpan file.", ex);
            }
        }

        // 2. Implementasi lengkap untuk menyimpan file
        public String storeFile(MultipartFile file) {
            // Normalisasi nama file
            String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());

            try {
                // Cek jika nama file mengandung karakter yang tidak valid
                if (originalFileName.contains("..")) {
                    throw new RuntimeException("Nama file mengandung path yang tidak valid: " + originalFileName);
                }

                // Tambahkan timestamp untuk membuat nama file unik
                String uniqueFileName = System.currentTimeMillis() + "_" + originalFileName;

                // Salin file ke lokasi target (menggantikan file yang sudah ada dengan nama yang sama)
                Path targetLocation = this.fileStorageLocation.resolve(uniqueFileName);
                Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

                return uniqueFileName;
            } catch (IOException ex) {
                throw new RuntimeException("Tidak dapat menyimpan file " + originalFileName + ". Coba lagi!", ex);
            }
        }

        // 3. Metode untuk mengambil/download file (sudah benar)
        public Resource loadFileAsResource(String fileName) {
            try {
                Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
                Resource resource = new UrlResource(filePath.toUri());
                if (resource.exists()) {
                    return resource;
                } else {
                    throw new RuntimeException("File tidak ditemukan " + fileName);
                }
            } catch (MalformedURLException ex) {
                throw new RuntimeException("File tidak ditemukan " + fileName, ex);
            }
        }
    }