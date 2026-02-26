package com.casainterior.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Thrown when an uploaded file has an unsupported MIME type.
 * Maps to HTTP 400 Bad Request.
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidFileTypeException extends RuntimeException {

    public InvalidFileTypeException(String contentType) {
        super(String.format(
                "File type '%s' is not allowed. Accepted types: image/jpeg, image/png, video/mp4",
                contentType));
    }
}
