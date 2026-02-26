package com.casainterior.backend.entity;

import com.casainterior.backend.enums.ProjectStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * JPA entity representing an interior design Project.
 * Projects can be in DRAFT or PUBLISHED state.
 * Team members are owned by the project — cascade all, orphan removal.
 */
@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 100)
    private String category;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 150)
    private String client;

    @Column(length = 150)
    private String location;

    @Column(length = 50)
    private String duration;

    private Integer year;

    @Column(length = 50)
    private String area;

    @Column(length = 50)
    private String budget;

    @Column(columnDefinition = "TEXT")
    private String challenge;

    @Column(columnDefinition = "TEXT")
    private String solution;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "video_url", length = 500)
    private String videoUrl;

    /**
     * Lifecycle status. Stored as VARCHAR(20) in DB.
     * Java enforces valid values via the enum type.
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private ProjectStatus status = ProjectStatus.DRAFT;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    /**
     * Team members belonging to this project.
     * Cascade ALL + orphanRemoval ensures members are deleted with project.
     */
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<ProjectTeamMember> teamMembers = new ArrayList<>();

    // ---- Convenience methods ----

    public void addTeamMember(ProjectTeamMember member) {
        member.setProject(this);
        this.teamMembers.add(member);
    }

    public void clearTeamMembers() {
        this.teamMembers.forEach(m -> m.setProject(null));
        this.teamMembers.clear();
    }
}
