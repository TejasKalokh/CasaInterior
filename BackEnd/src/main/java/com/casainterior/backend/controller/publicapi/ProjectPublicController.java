package com.casainterior.backend.controller.publicapi;

import com.casainterior.backend.dto.project.ProjectListResponse;
import com.casainterior.backend.dto.project.ProjectResponse;
import com.casainterior.backend.enums.ProjectStatus;
import com.casainterior.backend.service.ProjectService;
import com.casainterior.backend.util.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Public project API — no authentication required.
 * Returns only PUBLISHED projects to website visitors.
 */
@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@Tag(name = "Public - Projects", description = "Public project listing endpoints")
public class ProjectPublicController {

    private final ProjectService projectService;

    @GetMapping
    @Operation(summary = "Get all published projects (paginated)")
    public ResponseEntity<ApiResponse<Page<ProjectListResponse>>> getPublishedProjects(
            @PageableDefault(size = 12, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        Page<ProjectListResponse> projects = projectService.findByStatus(ProjectStatus.PUBLISHED, pageable);
        return ResponseEntity.ok(ApiResponse.success(projects));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single published project by id")
    public ResponseEntity<ApiResponse<ProjectResponse>> getProjectById(@PathVariable Long id) {
        ProjectResponse project = projectService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(project));
    }
}
