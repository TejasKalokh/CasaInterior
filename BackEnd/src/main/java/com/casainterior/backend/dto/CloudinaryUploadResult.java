package com.casainterior.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Result returned after a successful Cloudinary upload.
 * Contains the CDN URL and the public ID needed for deletion.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CloudinaryUploadResult {

    /** Full Cloudinary CDN URL, directly usable in frontend <img> / <video> tags */
    private String url;

    /** Cloudinary public_id, required for deletion via destroy() */
    private String publicId;
}
