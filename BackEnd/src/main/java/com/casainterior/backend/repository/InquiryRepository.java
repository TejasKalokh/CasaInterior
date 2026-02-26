package com.casainterior.backend.repository;

import com.casainterior.backend.entity.Inquiry;
import com.casainterior.backend.enums.InquiryStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repository for Inquiry entity.
 * Supports search by name/email/message and filter by status.
 */
@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {

    /** Count by status — used in dashboard stats. */
    long countByStatus(InquiryStatus status);

    /** Paginated list filtered by status. */
    Page<Inquiry> findByStatus(InquiryStatus status, Pageable pageable);

    /**
     * Full-text search across name, email, message with optional status filter.
     * When status is null, all statuses are returned.
     */
    @Query("""
                SELECT i FROM Inquiry i
                WHERE (:query IS NULL OR
                       LOWER(i.name) LIKE LOWER(CONCAT('%', :query, '%')) OR
                       LOWER(i.email) LIKE LOWER(CONCAT('%', :query, '%')) OR
                       LOWER(i.message) LIKE LOWER(CONCAT('%', :query, '%')))
                AND (:status IS NULL OR i.status = :status)
                ORDER BY i.createdAt DESC
            """)
    Page<Inquiry> searchInquiries(
            @Param("query") String query,
            @Param("status") InquiryStatus status,
            Pageable pageable);
}
