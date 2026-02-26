package com.casainterior.backend.repository;

import com.casainterior.backend.entity.Project;
import com.casainterior.backend.enums.ProjectStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

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

    /**
     * Fetch a project with its team members in a single JOIN FETCH query.
     * Avoids the N+1 problem when rendering project detail pages.
     */
    @Query("SELECT p FROM Project p LEFT JOIN FETCH p.teamMembers WHERE p.id = :id")
    Optional<Project> findByIdWithTeamMembers(@Param("id") Long id);
}
