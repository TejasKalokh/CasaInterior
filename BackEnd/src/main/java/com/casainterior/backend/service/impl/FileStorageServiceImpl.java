package com.casainterior.backend.service.impl;

import com.casainterior.backend.exception.InvalidFileTypeException;
import com.casainterior.backend.service.FileStorageService;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

/**
 * Local disk-based file storage implementation.
 *
 * <p>
 * Files are saved to {storagePath}/{subDir}/{uuid}.{ext}.
 * The path is returned as a URL the frontend can use:
 * /media/{subDir}/{uuid}.{ext}
 *
 * <p>
 * File type validation strictly checks Content-Type (not just file extension).
 * Allowed types: image/jpeg, image/png, video/mp4
 */
@Service
@Slf4j
public class FileStorageServiceImpl implements FileStorageService {

    /**
     * Strictly validated allowed Content-Types.
     * Disallows gif, svg, webp, and other formats not explicitly approved.
     */
    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            "image/jpeg",
            "image/png",
            "video/mp4");

    @Value("${app.file.storage-path}")
    private String storagePath;

    private Path rootLocation;

    @PostConstruct
    public void init() {
        rootLocation = Paths.get(storagePath).toAbsolutePath().normalize();
        try {
            Files.createDirectories(rootLocation);
            log.info("File storage initialized at: {}", rootLocation);
        } catch (IOException ex) {
            throw new RuntimeException("Could not initialize file storage at: " + rootLocation, ex);
        }
    }

    @Override
    public String store(MultipartFile file, String subDir) {
        // ---- Validate content type ----
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType)) {
            throw new InvalidFileTypeException(contentType != null ? contentType : "unknown");
        }

        // ---- Validate file is not empty ----
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Cannot store an empty file");
        }

        // ---- Determine extension from content type ----
        String extension = switch (contentType) {
            case "image/jpeg" -> ".jpg";
            case "image/png" -> ".png";
            case "video/mp4" -> ".mp4";
            default -> throw new InvalidFileTypeException(contentType);
        };

        // ---- Generate unique filename ----
        String filename = UUID.randomUUID() + extension;

        // ---- Create subdirectory ----
        Path destinationDir = rootLocation.resolve(subDir).normalize();
        try {
            Files.createDirectories(destinationDir);
            Path destinationFile = destinationDir.resolve(filename);

            // Path traversal guard
            if (!destinationFile.startsWith(rootLocation)) {
                throw new SecurityException("Attempted path traversal attack detected");
            }

            Files.copy(file.getInputStream(), destinationFile, StandardCopyOption.REPLACE_EXISTING);
            String relativePath = "/media/" + subDir + "/" + filename;
            log.info("Stored file '{}' -> '{}'", file.getOriginalFilename(), relativePath);
            return relativePath;

        } catch (IOException ex) {
            throw new RuntimeException("Failed to store file: " + ex.getMessage(), ex);
        }
    }

    @Override
    public void delete(String filePath) {
        if (filePath == null || filePath.isBlank())
            return;

        // Strip leading /media/ prefix to get the filesystem relative path
        String relativePath = filePath.startsWith("/media/")
                ? filePath.substring("/media/".length())
                : filePath;

        Path target = rootLocation.resolve(relativePath).normalize();

        try {
            if (Files.exists(target)) {
                Files.delete(target);
                log.info("Deleted file: {}", target);
            }
        } catch (IOException ex) {
            log.warn("Could not delete file '{}': {}", target, ex.getMessage());
        }
    }
}
