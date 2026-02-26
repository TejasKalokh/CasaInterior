package com.casainterior.backend.dto.project;

import com.casainterior.backend.enums.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Lightweight project summary for list/paginated views.
 * Excludes heavy text fields (description, challenge, solution, teamMembers).
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectListResponse {

    private Long id;
    private String title;
    private String category;
    private String location;
    private Integer year;
    private String imageUrl;
    private ProjectStatus status;
    private LocalDateTime createdAt;
}
