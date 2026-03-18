package com.casainterior.backend.service;

import com.casainterior.backend.dto.CloudinaryUploadResult;
import org.springframework.web.multipart.MultipartFile;

/**
 * File storage service contract.
 * Uploads files to Cloudinary and returns CDN URLs.
 */
public interface FileStorageService {

    /**
     * Uploads a file to Cloudinary and returns the URL + public ID.
     *
     * @param file   the uploaded multipart file
     * @param subDir subfolder within Cloudinary (e.g., "images", "videos")
     * @return upload result containing the CDN URL and public ID
     */
    CloudinaryUploadResult store(MultipartFile file, String subDir);

    /**
     * Deletes a previously uploaded file from Cloudinary.
     *
     * @param publicId the Cloudinary public_id of the file to delete
     */
    void delete(String publicId);
}
