package com.casainterior.backend.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Uniform error body returned by GlobalExceptionHandler.
 *
 * <pre>
 * {
 *   "status": 404,
 *   "message": "Project not found with id: 5",
 *   "errors": [],
 *   "timestamp": "2026-02-24T11:00:00"
 * }
 * </pre>
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiError {

    private int status;
    private String message;
    private List<String> errors;

    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();
}
