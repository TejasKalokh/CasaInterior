package com.casainterior.backend.controller.admin;

import com.casainterior.backend.dto.CloudinaryUploadResult;
import com.casainterior.backend.service.FileStorageService;
import com.casainterior.backend.util.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

/**
 * Admin file upload controller.
 *
 * <p>
 * Accepts multipart files and uploads them to Cloudinary.
 * Returns the CDN URL and public ID for use in Project imageUrl/videoUrl
 * and imagePublicId/videoPublicId fields.
 *
 * <p>
 * Validated content types: image/jpeg, image/png, image/webp, video/mp4
 * File type and size errors return HTTP 400 via GlobalExceptionHandler.
 */
@RestController
@RequestMapping("/api/admin/upload")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'MAIN_ADMIN')")
@Tag(name = "Admin - File Upload", description = "File upload for project images and videos")
@SecurityRequirement(name = "bearerAuth")
public class FileUploadController {

    private final FileStorageService fileStorageService;

    /**
     * Upload a project image (jpg/png/webp) or video (mp4).
     *
     * @param file the multipart file
     * @param type "images" or "videos" — determines the Cloudinary subfolder
     * @return the CDN URL and public ID of the uploaded file
     */
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload a file (image/jpeg, image/png, image/webp, video/mp4 only)",
               description = "Returns the Cloudinary URL and public ID. Use these in Project imageUrl/videoUrl and imagePublicId/videoPublicId fields.")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadFile(
            @RequestPart("file") MultipartFile file,
            @RequestParam(defaultValue = "images") String type) {
        CloudinaryUploadResult result = fileStorageService.store(file, type);
        return ResponseEntity.ok(ApiResponse.success(
                "File uploaded successfully",
                Map.of("url", result.getUrl(),
                       "publicId", result.getPublicId(),
                       "type", type)));
    }
}
