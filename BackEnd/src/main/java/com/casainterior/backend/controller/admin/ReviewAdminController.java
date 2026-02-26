package com.casainterior.backend.controller.admin;

import com.casainterior.backend.dto.review.ReviewRequest;
import com.casainterior.backend.dto.review.ReviewResponse;
import com.casainterior.backend.service.ReviewService;
import com.casainterior.backend.util.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Admin review management controller.
 * Full CRUD + active toggle.
 */
@RestController
@RequestMapping("/api/admin/reviews")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'MAIN_ADMIN')")
@Tag(name = "Admin - Reviews", description = "Review CRUD and active toggle")
@SecurityRequirement(name = "bearerAuth")
public class ReviewAdminController {

    private final ReviewService reviewService;

    @GetMapping
    @Operation(summary = "List all reviews with optional active filter (paginated)")
    public ResponseEntity<ApiResponse<Page<ReviewResponse>>> getReviews(
            @RequestParam(required = false) Boolean active,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(reviewService.findAll(active, pageable)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single review by id")
    public ResponseEntity<ApiResponse<ReviewResponse>> getReview(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(reviewService.findById(id)));
    }

    @PostMapping
    @Operation(summary = "Create a new review")
    public ResponseEntity<ApiResponse<ReviewResponse>> createReview(
            @Valid @RequestBody ReviewRequest request) {
        ReviewResponse created = reviewService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Review created", created));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing review")
    public ResponseEntity<ApiResponse<ReviewResponse>> updateReview(
            @PathVariable Long id,
            @Valid @RequestBody ReviewRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Review updated", reviewService.update(id, request)));
    }

    @PatchMapping("/{id}/toggle")
    @Operation(summary = "Toggle review visibility (active ↔ inactive)")
    public ResponseEntity<ApiResponse<ReviewResponse>> toggleActive(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Review visibility toggled", reviewService.toggleActive(id)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a review")
    public ResponseEntity<ApiResponse<Void>> deleteReview(@PathVariable Long id) {
        reviewService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Review deleted"));
    }
}
