package com.casainterior.backend.controller.admin;

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
 * Accepts multipart files and stores them locally.
 * Returns the URL path for the stored file for use in Project imageUrl/videoUrl
 * fields.
 *
 * <p>
 * Validated content types: image/jpeg, image/png, video/mp4
 * File type errors return HTTP 400 via GlobalExceptionHandler.
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
     * Upload a project image (jpg/png) or video (mp4).
     *
     * @param file the multipart file
     * @param type "images" or "videos" — determines the storage subdirectory
     * @return the URL path of the saved file
     */
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload a file (image/jpeg, image/png, video/mp4 only)", description = "Returns the URL path. Use this path in Project imageUrl or videoUrl field.")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadFile(
            @RequestPart("file") MultipartFile file,
            @RequestParam(defaultValue = "images") String type) {
        String storedPath = fileStorageService.store(file, type);
        return ResponseEntity.ok(ApiResponse.success(
                "File uploaded successfully",
                Map.of("url", storedPath, "type", type)));
    }
}
