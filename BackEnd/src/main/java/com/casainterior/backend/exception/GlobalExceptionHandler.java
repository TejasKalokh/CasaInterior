package com.casainterior.backend.exception;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.List;

/**
 * Centralized exception handler for all controllers.
 * Returns a uniform ApiError body for every exception type.
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    // ============================================================
    // 404 Not Found
    // ============================================================
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleResourceNotFound(ResourceNotFoundException ex) {
        log.warn("Resource not found: {}", ex.getMessage());
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage(), null);
    }

    // ============================================================
    // 404 Not Found — Spring MVC static resource not found
    // (e.g. GET /images/file.mp4 that doesn't exist as a static file)
    // ============================================================
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ApiError> handleNoResourceFound(NoResourceFoundException ex) {
        log.warn("Static resource not found: {}", ex.getResourcePath());
        return buildResponse(HttpStatus.NOT_FOUND, "Resource not found: " + ex.getResourcePath(), null);
    }

    // ============================================================
    // 400 Bad Request — Bean Validation failures
    // ============================================================
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidationErrors(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .toList();

        log.warn("Validation failed: {}", errors);
        return buildResponse(HttpStatus.BAD_REQUEST, "Validation failed", errors);
    }

    // ============================================================
    // 400 Bad Request — Invalid file type
    // ============================================================
    @ExceptionHandler(InvalidFileTypeException.class)
    public ResponseEntity<ApiError> handleInvalidFileType(InvalidFileTypeException ex) {
        log.warn("Invalid file type: {}", ex.getMessage());
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), null);
    }

    // ============================================================
    // 400 Bad Request — File too large
    // ============================================================
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ApiError> handleFileTooLarge(MaxUploadSizeExceededException ex) {
        log.warn("File upload too large: {}", ex.getMessage());
        return buildResponse(HttpStatus.BAD_REQUEST,
                "Uploaded file exceeds the maximum allowed size of 50MB", null);
    }

    // ============================================================
    // 401 Unauthorized — Invalid credentials
    // ============================================================
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiError> handleBadCredentials(BadCredentialsException ex) {
        log.warn("Authentication failed: {}", ex.getMessage());
        return buildResponse(HttpStatus.UNAUTHORIZED, "Invalid email or password", null);
    }

    // ============================================================
    // 401 Unauthorized — JWT expired or malformed
    // ============================================================
    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ApiError> handleExpiredJwt(ExpiredJwtException ex) {
        return buildResponse(HttpStatus.UNAUTHORIZED, "JWT token has expired", null);
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ApiError> handleJwtException(JwtException ex) {
        return buildResponse(HttpStatus.UNAUTHORIZED, "Invalid JWT token", null);
    }

    // ============================================================
    // 403 Forbidden
    // ============================================================
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ApiError> handleUnauthorized(UnauthorizedException ex) {
        log.warn("Authorization denied: {}", ex.getMessage());
        return buildResponse(HttpStatus.FORBIDDEN, ex.getMessage(), null);
    }

    // ============================================================
    // 409 Conflict — Duplicate resource
    // ============================================================
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiError> handleIllegalArgument(IllegalArgumentException ex) {
        log.warn("Illegal argument: {}", ex.getMessage());
        return buildResponse(HttpStatus.CONFLICT, ex.getMessage(), null);
    }

    // ============================================================
    // 500 Internal Server Error — Catch-all
    // ============================================================
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGenericException(Exception ex) {
        log.error("Unexpected error occurred", ex);
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR,
                "An unexpected error occurred. Please try again later.", null);
    }

    // ============================================================
    // Helper
    // ============================================================
    private ResponseEntity<ApiError> buildResponse(HttpStatus status, String message, List<String> errors) {
        ApiError apiError = ApiError.builder()
                .status(status.value())
                .message(message)
                .errors(errors)
                .build();
        return ResponseEntity.status(status).body(apiError);
    }
}
