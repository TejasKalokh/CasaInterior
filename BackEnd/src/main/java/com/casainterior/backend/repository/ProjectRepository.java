package com.casainterior.backend.repository;

import com.casainterior.backend.entity.Project;
import com.casainterior.backend.enums.ProjectStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for Project entity.
 * Provides paginated access by status for admin and public APIs.
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    /** Paginated listing by status (used for public PUBLISHED feed). */
    Page<Project> findByStatus(ProjectStatus status, Pageable pageable);

    /** Count projects by status (used in dashboard stats). */
    long countByStatus(ProjectStatus status);
}
