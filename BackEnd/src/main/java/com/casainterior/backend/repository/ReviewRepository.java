package com.casainterior.backend.repository;

import com.casainterior.backend.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for Review entity.
 */
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    /** Public API: only active reviews, paginated. */
    Page<Review> findByActiveTrue(Pageable pageable);

    /** Admin: filter by active status. */
    Page<Review> findByActive(Boolean active, Pageable pageable);
}
