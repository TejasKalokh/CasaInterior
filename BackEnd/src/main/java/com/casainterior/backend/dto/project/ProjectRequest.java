package com.casainterior.backend.dto.project;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * Request DTO for creating or updating a Project.
 * Used in both POST and PUT endpoints.
 */
@Data
public class ProjectRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String title;

    @Size(max = 100, message = "Category must not exceed 100 characters")
    private String category;

    private String description;
    private String client;

    @Size(max = 150, message = "Location must not exceed 150 characters")
    private String location;

    private String duration;
    private Integer year;
    private String area;
    private String budget;
    private String challenge;
    private String solution;
    private String imageUrl;
    private String imagePublicId;
    private String videoUrl;
    private String videoPublicId;

    /** Team members submitted inline with the project */
    @Valid
    private List<TeamMemberRequest> teamMembers = new ArrayList<>();

    // ---- Nested DTO ----

    @Data
    public static class TeamMemberRequest {
        @NotBlank(message = "Team member name is required")
        private String name;
        private String role;
    }
}
