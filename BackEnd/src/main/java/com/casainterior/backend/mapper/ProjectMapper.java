package com.casainterior.backend.mapper;

import com.casainterior.backend.dto.project.ProjectListResponse;
import com.casainterior.backend.dto.project.ProjectRequest;
import com.casainterior.backend.dto.project.ProjectResponse;
import com.casainterior.backend.entity.Project;
import com.casainterior.backend.entity.ProjectTeamMember;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

/**
 * Manual mapper for Project ↔ DTO conversions.
 * No annotation processor dependencies — plain Java for reliability.
 */
@Component
public class ProjectMapper {

    public Project toEntity(ProjectRequest request) {
        return Project.builder()
                .title(request.getTitle())
                .category(request.getCategory())
                .description(request.getDescription())
                .client(request.getClient())
                .location(request.getLocation())
                .duration(request.getDuration())
                .year(request.getYear())
                .area(request.getArea())
                .budget(request.getBudget())
                .challenge(request.getChallenge())
                .solution(request.getSolution())
                .imageUrl(request.getImageUrl())
                .imagePublicId(request.getImagePublicId())
                .videoUrl(request.getVideoUrl())
                .videoPublicId(request.getVideoPublicId())
                .build();
    }

    public void updateEntity(Project project, ProjectRequest request) {
        project.setTitle(request.getTitle());
        project.setCategory(request.getCategory());
        project.setDescription(request.getDescription());
        project.setClient(request.getClient());
        project.setLocation(request.getLocation());
        project.setDuration(request.getDuration());
        project.setYear(request.getYear());
        project.setArea(request.getArea());
        project.setBudget(request.getBudget());
        project.setChallenge(request.getChallenge());
        project.setSolution(request.getSolution());
        project.setImageUrl(request.getImageUrl());
        project.setImagePublicId(request.getImagePublicId());
        project.setVideoUrl(request.getVideoUrl());
        project.setVideoPublicId(request.getVideoPublicId());
    }

    public ProjectResponse toResponse(Project project) {
        return ProjectResponse.builder()
                .id(project.getId())
                .title(project.getTitle())
                .category(project.getCategory())
                .description(project.getDescription())
                .client(project.getClient())
                .location(project.getLocation())
                .duration(project.getDuration())
                .year(project.getYear())
                .area(project.getArea())
                .budget(project.getBudget())
                .challenge(project.getChallenge())
                .solution(project.getSolution())
                .imageUrl(project.getImageUrl())
                .imagePublicId(project.getImagePublicId())
                .videoUrl(project.getVideoUrl())
                .videoPublicId(project.getVideoPublicId())
                .status(project.getStatus())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .teamMembers(mapTeamMembers(project.getTeamMembers()))
                .build();
    }

    public ProjectListResponse toListResponse(Project project) {
        return ProjectListResponse.builder()
                .id(project.getId())
                .title(project.getTitle())
                .category(project.getCategory())
                .location(project.getLocation())
                .year(project.getYear())
                .imageUrl(project.getImageUrl())
                .status(project.getStatus())
                .createdAt(project.getCreatedAt())
                .build();
    }

    public ProjectTeamMember toTeamMemberEntity(ProjectRequest.TeamMemberRequest req) {
        return ProjectTeamMember.builder()
                .name(req.getName())
                .role(req.getRole())
                .build();
    }

    private List<ProjectResponse.TeamMemberResponse> mapTeamMembers(List<ProjectTeamMember> members) {
        if (members == null)
            return Collections.emptyList();
        return members.stream()
                .map(m -> ProjectResponse.TeamMemberResponse.builder()
                        .id(m.getId())
                        .name(m.getName())
                        .role(m.getRole())
                        .build())
                .toList();
    }
}
