package com.casainterior.backend.dto.review;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Response DTO for a Review.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponse {

    private Long id;
    private String author;
    private String role;
    private String location;
    private Integer rating;
    private String quote;
    private Boolean active;
    private LocalDateTime createdAt;
}
