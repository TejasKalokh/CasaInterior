package com.casainterior.backend.mapper;

import com.casainterior.backend.dto.review.ReviewRequest;
import com.casainterior.backend.dto.review.ReviewResponse;
import com.casainterior.backend.entity.Review;
import org.springframework.stereotype.Component;

/**
 * Manual mapper for Review ↔ DTO conversions.
 */
@Component
public class ReviewMapper {

    public Review toEntity(ReviewRequest request) {
        return Review.builder()
                .author(request.getAuthor())
                .role(request.getRole())
                .location(request.getLocation())
                .rating(request.getRating())
                .quote(request.getQuote())
                .build();
    }

    public void updateEntity(Review review, ReviewRequest request) {
        review.setAuthor(request.getAuthor());
        review.setRole(request.getRole());
        review.setLocation(request.getLocation());
        review.setRating(request.getRating());
        review.setQuote(request.getQuote());
    }

    public ReviewResponse toResponse(Review review) {
        return ReviewResponse.builder()
                .id(review.getId())
                .author(review.getAuthor())
                .role(review.getRole())
                .location(review.getLocation())
                .rating(review.getRating())
                .quote(review.getQuote())
                .active(review.getActive())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
