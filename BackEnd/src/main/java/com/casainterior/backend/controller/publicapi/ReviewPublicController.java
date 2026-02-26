package com.casainterior.backend.controller.publicapi;

import com.casainterior.backend.dto.review.ReviewResponse;
import com.casainterior.backend.service.ReviewService;
import com.casainterior.backend.util.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Public review API — returns only active (visible) reviews.
 * No authentication required.
 */
@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@Tag(name = "Public - Reviews", description = "Public client testimonials endpoint")
public class ReviewPublicController {

    private final ReviewService reviewService;

    @GetMapping
    @Operation(summary = "Get all active reviews (paginated)")
    public ResponseEntity<ApiResponse<Page<ReviewResponse>>> getActiveReviews(
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ReviewResponse> reviews = reviewService.findActiveReviews(pageable);
        return ResponseEntity.ok()
                .cacheControl(CacheControl.maxAge(60, java.util.concurrent.TimeUnit.SECONDS).cachePublic())
                .body(ApiResponse.success(reviews));
    }
}
