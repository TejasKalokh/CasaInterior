package com.casainterior.backend.controller.admin;

import com.casainterior.backend.dto.project.ProjectListResponse;
import com.casainterior.backend.dto.project.ProjectRequest;
import com.casainterior.backend.dto.project.ProjectResponse;
import com.casainterior.backend.enums.ProjectStatus;
import com.casainterior.backend.service.ProjectService;
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
 * Admin project management controller.
 * Requires authentication. All roles (ADMIN, MAIN_ADMIN) can use these
 * endpoints.
 */
@RestController
@RequestMapping("/api/admin/projects")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'MAIN_ADMIN')")
@Tag(name = "Admin - Projects", description = "Project CRUD and status management")
@SecurityRequirement(name = "bearerAuth")
public class ProjectAdminController {

    private final ProjectService projectService;

    @GetMapping
    @Operation(summary = "List all projects (paginated, admin view with all statuses)")
    public ResponseEntity<ApiResponse<Page<ProjectListResponse>>> getAllProjects(
            @RequestParam(required = false) ProjectStatus status,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ProjectListResponse> projects = (status != null)
                ? projectService.findByStatus(status, pageable)
                : projectService.findAll(pageable);
        return ResponseEntity.ok(ApiResponse.success(projects));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get project detail by id")
    public ResponseEntity<ApiResponse<ProjectResponse>> getProject(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(projectService.findById(id)));
    }

    @PostMapping
    @Operation(summary = "Create a new project (saved as DRAFT by default)")
    public ResponseEntity<ApiResponse<ProjectResponse>> createProject(
            @Valid @RequestBody ProjectRequest request) {
        ProjectResponse created = projectService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Project created successfully", created));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing project")
    public ResponseEntity<ApiResponse<ProjectResponse>> updateProject(
            @PathVariable Long id,
            @Valid @RequestBody ProjectRequest request) {
        return ResponseEntity.ok(
                ApiResponse.success("Project updated successfully", projectService.update(id, request)));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Update project status (DRAFT → PUBLISHED or back)")
    public ResponseEntity<ApiResponse<ProjectResponse>> updateStatus(
            @PathVariable Long id,
            @RequestParam ProjectStatus status) {
        return ResponseEntity.ok(
                ApiResponse.success("Project status updated", projectService.updateStatus(id, status)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a project and all its media")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable Long id) {
        projectService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Project deleted successfully"));
    }
}
