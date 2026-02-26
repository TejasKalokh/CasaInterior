package com.casainterior.backend.service;

import com.casainterior.backend.dto.project.ProjectListResponse;
import com.casainterior.backend.dto.project.ProjectRequest;
import com.casainterior.backend.dto.project.ProjectResponse;
import com.casainterior.backend.enums.ProjectStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Project management service contract.
 */
public interface ProjectService {

    Page<ProjectListResponse> findAll(Pageable pageable);

    Page<ProjectListResponse> findByStatus(ProjectStatus status, Pageable pageable);

    ProjectResponse findById(Long id);

    ProjectResponse create(ProjectRequest request);

    ProjectResponse update(Long id, ProjectRequest request);

    ProjectResponse updateStatus(Long id, ProjectStatus newStatus);

    void delete(Long id);
}
