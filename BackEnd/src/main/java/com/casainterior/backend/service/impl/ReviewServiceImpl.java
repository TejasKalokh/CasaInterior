package com.casainterior.backend.service.impl;

import com.casainterior.backend.dto.review.ReviewRequest;
import com.casainterior.backend.dto.review.ReviewResponse;
import com.casainterior.backend.entity.Review;
import com.casainterior.backend.exception.ResourceNotFoundException;
import com.casainterior.backend.mapper.ReviewMapper;
import com.casainterior.backend.repository.ReviewRepository;
import com.casainterior.backend.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Review service implementation.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "reviews", key = "#pageable.pageNumber + '_' + #pageable.pageSize")
    public Page<ReviewResponse> findActiveReviews(Pageable pageable) {
        return reviewRepository.findByActiveTrue(pageable)
                .map(reviewMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ReviewResponse> findAll(Boolean active, Pageable pageable) {
        if (active != null) {
            return reviewRepository.findByActive(active, pageable)
                    .map(reviewMapper::toResponse);
        }
        return reviewRepository.findAll(pageable)
                .map(reviewMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public ReviewResponse findById(Long id) {
        return reviewMapper.toResponse(findReviewById(id));
    }

    @Override
    @CacheEvict(value = "reviews", allEntries = true)
    public ReviewResponse create(ReviewRequest request) {
        Review review = reviewMapper.toEntity(request);
        Review saved = reviewRepository.save(review);
        log.info("Created review by '{}'", saved.getAuthor());
        return reviewMapper.toResponse(saved);
    }

    @Override
    @CacheEvict(value = "reviews", allEntries = true)
    public ReviewResponse update(Long id, ReviewRequest request) {
        Review review = findReviewById(id);
        reviewMapper.updateEntity(review, request);
        Review saved = reviewRepository.save(review);
        log.info("Updated review id={}", saved.getId());
        return reviewMapper.toResponse(saved);
    }

    @Override
    @CacheEvict(value = "reviews", allEntries = true)
    public ReviewResponse toggleActive(Long id) {
        Review review = findReviewById(id);
        review.setActive(!review.getActive());
        Review saved = reviewRepository.save(review);
        log.info("Review id={} active toggled to {}", id, saved.getActive());
        return reviewMapper.toResponse(saved);
    }

    @Override
    @CacheEvict(value = "reviews", allEntries = true)
    public void delete(Long id) {
        Review review = findReviewById(id);
        reviewRepository.delete(review);
        log.info("Deleted review id={}", id);
    }

    private Review findReviewById(Long id) {
        return reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review", "id", id));
    }
}
