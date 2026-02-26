package com.casainterior.backend.repository;

import com.casainterior.backend.entity.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for ActivityLog entity.
 * Used by dashboard to show the 10 most recent events.
 */
@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {

    /** Fetch the 10 most recent activity entries ordered by time descending. */
    List<ActivityLog> findTop10ByOrderByCreatedAtDesc();
}
