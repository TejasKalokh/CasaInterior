package com.casainterior.backend.dto.review;

import jakarta.validation.constraints.*;
import lombok.Data;

/**
 * Request DTO for creating or updating a Review.
 */
@Data
public class ReviewRequest {

    @NotBlank(message = "Author name is required")
    @Size(max = 100, message = "Author name must not exceed 100 characters")
    private String author;

    @Size(max = 100, message = "Role must not exceed 100 characters")
    private String role;

    @Size(max = 100, message = "Location must not exceed 100 characters")
    private String location;

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must not exceed 5")
    private Integer rating;

    @NotBlank(message = "Review text (quote) is required")
    private String quote;
}
