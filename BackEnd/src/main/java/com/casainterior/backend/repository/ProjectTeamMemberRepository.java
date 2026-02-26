package com.casainterior.backend.repository;

import com.casainterior.backend.entity.ProjectTeamMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for ProjectTeamMember entity.
 * Deletion is handled via cascade from Project — direct deletion rarely needed.
 */
@Repository
public interface ProjectTeamMemberRepository extends JpaRepository<ProjectTeamMember, Long> {

    void deleteAllByProjectId(Long projectId);
}
