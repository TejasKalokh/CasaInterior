package com.casainterior.backend.service;

import org.springframework.web.multipart.MultipartFile;

/**
 * File storage service contract.
 * Currently saves files to local disk. Designed to be swappable with S3 later.
 */
public interface FileStorageService {

    /**
     * Stores an uploaded file and returns the accessible URL/path.
     *
     * @param file   the uploaded multipart file
     * @param subDir subfolder under the storage root (e.g., "images", "videos")
     * @return relative URL path to the stored file, e.g. "/media/images/uuid.jpg"
     */
    String store(MultipartFile file, String subDir);

    /**
     * Deletes a previously stored file by its path.
     *
     * @param filePath relative path returned by store()
     */
    void delete(String filePath);
}
