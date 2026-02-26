package com.casainterior.backend.dto.project;

import com.casainterior.backend.enums.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Full project response including team members.
 * Used for single-project GET and admin detail views.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectResponse {

    private Long id;
    private String title;
    private String category;
    private String description;
    private String client;
    private String location;
    private String duration;
    private Integer year;
    private String area;
    private String budget;
    private String challenge;
    private String solution;
    private String imageUrl;
    private String videoUrl;
    private ProjectStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<String> features;
    private List<String> materials;
    private List<TeamMemberResponse> teamMembers;

    // ---- Nested DTO ----

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TeamMemberResponse {
        private Long id;
        private String name;
        private String role;
    }
}
