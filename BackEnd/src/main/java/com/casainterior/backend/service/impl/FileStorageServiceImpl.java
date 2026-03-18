package com.casainterior.backend.service.impl;

import com.casainterior.backend.dto.CloudinaryUploadResult;
import com.casainterior.backend.exception.InvalidFileTypeException;
import com.casainterior.backend.service.FileStorageService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Cloudinary-based file storage implementation.
 *
 * <p>
 * Uploads images and videos to Cloudinary CDN.
 * Uses resource_type "auto" to handle both images and videos.
 * All files are stored under the "casa-interior" folder.
 *
 * <p>
 * Validated content types: image/jpeg, image/png, image/webp, video/mp4.
 * Max file size: 10 MB.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class FileStorageServiceImpl implements FileStorageService {

    private static final List<String> ALLOWED_TYPES = List.of(
            "image/jpeg",
            "image/png",
            "image/webp",
            "video/mp4"
    );

    /** 10 MB in bytes */
    private static final long MAX_FILE_SIZE = 10L * 1024 * 1024;

    private static final String CLOUDINARY_FOLDER = "casa-interior";

    private final Cloudinary cloudinary;

    @Override
    public CloudinaryUploadResult store(MultipartFile file, String subDir) {
        // ---- Validate empty file ----
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Cannot store an empty file");
        }

        // ---- Validate content type ----
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_TYPES.contains(contentType)) {
            throw new InvalidFileTypeException(contentType != null ? contentType : "unknown");
        }

        // ---- Validate file size (10 MB max) ----
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException(
                    "File too large. Maximum allowed size is 10MB, got " +
                    (file.getSize() / (1024 * 1024)) + "MB");
        }

        // ---- Upload to Cloudinary ----
        try {
            String folder = CLOUDINARY_FOLDER + "/" + subDir;

            @SuppressWarnings("unchecked")
            Map<String, Object> uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "resource_type", "auto",
                            "folder", folder,
                            "quality", "auto",
                            "fetch_format", "auto"
                    )
            );

            String secureUrl = (String) uploadResult.get("secure_url");
            String publicId = (String) uploadResult.get("public_id");

            log.info("Uploaded '{}' to Cloudinary -> url='{}', publicId='{}'",
                    file.getOriginalFilename(), secureUrl, publicId);

            return CloudinaryUploadResult.builder()
                    .url(secureUrl)
                    .publicId(publicId)
                    .build();

        } catch (IOException ex) {
            log.error("Failed to upload file '{}' to Cloudinary: {}",
                    file.getOriginalFilename(), ex.getMessage());
            throw new RuntimeException("Failed to upload file to cloud storage: " + ex.getMessage(), ex);
        }
    }

    @Override
    public void delete(String publicId) {
        if (publicId == null || publicId.isBlank()) {
            return;
        }

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> result = cloudinary.uploader().destroy(
                    publicId,
                    ObjectUtils.asMap("resource_type", "auto")
            );

            String status = (String) result.get("result");
            if ("ok".equals(status)) {
                log.info("Deleted Cloudinary asset: {}", publicId);
            } else {
                log.warn("Cloudinary deletion returned '{}' for publicId: {}", status, publicId);
            }
        } catch (IOException ex) {
            log.warn("Could not delete Cloudinary asset '{}': {}", publicId, ex.getMessage());
        }
    }
}
