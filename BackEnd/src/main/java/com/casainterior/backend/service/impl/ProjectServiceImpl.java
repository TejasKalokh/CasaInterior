package com.casainterior.backend.service.impl;

import com.casainterior.backend.dto.project.ProjectListResponse;
import com.casainterior.backend.dto.project.ProjectRequest;
import com.casainterior.backend.dto.project.ProjectResponse;
import com.casainterior.backend.entity.ActivityLog;
import com.casainterior.backend.entity.Project;
import com.casainterior.backend.entity.ProjectTeamMember;
import com.casainterior.backend.enums.ProjectStatus;
import com.casainterior.backend.exception.ResourceNotFoundException;
import com.casainterior.backend.mapper.ProjectMapper;
import com.casainterior.backend.repository.ActivityLogRepository;
import com.casainterior.backend.repository.ProjectRepository;
import com.casainterior.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Project service implementation.
 * Handles CRUD, status transitions, and team member management.
 * Writes to activity_log on project publish.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ActivityLogRepository activityLogRepository;
    private final ProjectMapper projectMapper;

    @Override
    @Transactional(readOnly = true)
    public Page<ProjectListResponse> findAll(Pageable pageable) {
        return projectRepository.findAll(pageable)
                .map(projectMapper::toListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProjectListResponse> findByStatus(ProjectStatus status, Pageable pageable) {
        return projectRepository.findByStatus(status, pageable)
                .map(projectMapper::toListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectResponse findById(Long id) {
        Project project = findProjectById(id);
        return projectMapper.toResponse(project);
    }

    @Override
    public ProjectResponse create(ProjectRequest request) {
        Project project = projectMapper.toEntity(request);

        // Attach team members
        if (request.getTeamMembers() != null) {
            request.getTeamMembers().forEach(memberReq -> {
                ProjectTeamMember member = projectMapper.toTeamMemberEntity(memberReq);
                project.addTeamMember(member);
            });
        }

        Project saved = projectRepository.save(project);
        log.info("Created project with id={}, title='{}'", saved.getId(), saved.getTitle());

        return projectMapper.toResponse(saved);
    }

    @Override
    public ProjectResponse update(Long id, ProjectRequest request) {
        Project project = findProjectById(id);

        projectMapper.updateEntity(project, request);

        // Replace team members
        project.clearTeamMembers();
        if (request.getTeamMembers() != null) {
            request.getTeamMembers().forEach(memberReq -> {
                ProjectTeamMember member = projectMapper.toTeamMemberEntity(memberReq);
                project.addTeamMember(member);
            });
        }

        Project saved = projectRepository.save(project);
        log.info("Updated project id={}", saved.getId());

        return projectMapper.toResponse(saved);
    }

    @Override
    public ProjectResponse updateStatus(Long id, ProjectStatus newStatus) {
        Project project = findProjectById(id);
        ProjectStatus oldStatus = project.getStatus();

        project.setStatus(newStatus);
        Project saved = projectRepository.save(project);

        // Log publishing events to activity_log
        if (newStatus == ProjectStatus.PUBLISHED && oldStatus != ProjectStatus.PUBLISHED) {
            activityLogRepository.save(ActivityLog.builder()
                    .type("PROJECT")
                    .message("Project published: " + saved.getTitle())
                    .build());
        }

        log.info("Project id={} status changed: {} -> {}", id, oldStatus, newStatus);
        return projectMapper.toResponse(saved);
    }

    @Override
    public void delete(Long id) {
        Project project = findProjectById(id);
        projectRepository.delete(project);
        log.info("Deleted project id={}", id);
    }

    // ---- Private helpers ----

    private Project findProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));
    }
}
