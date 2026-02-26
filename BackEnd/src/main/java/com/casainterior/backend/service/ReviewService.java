package com.casainterior.backend.service;

import com.casainterior.backend.dto.review.ReviewRequest;
import com.casainterior.backend.dto.review.ReviewResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Review management service contract.
 */
public interface ReviewService {

    /** Public: only active reviews, paginated. */
    Page<ReviewResponse> findActiveReviews(Pageable pageable);

    /** Admin: all reviews with optional active filter. */
    Page<ReviewResponse> findAll(Boolean active, Pageable pageable);

    ReviewResponse findById(Long id);

    ReviewResponse create(ReviewRequest request);

    ReviewResponse update(Long id, ReviewRequest request);

    ReviewResponse toggleActive(Long id);

    void delete(Long id);
}
