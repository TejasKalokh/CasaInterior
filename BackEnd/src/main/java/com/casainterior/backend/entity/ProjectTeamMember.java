package com.casainterior.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

/**
 * A team member associated with a specific Project.
 * Owned by Project via @ManyToOne — deleted automatically when project is
 * removed.
 */
@Entity
@Table(name = "project_team_members")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectTeamMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100)
    private String name;

    @Column(length = 100)
    private String role;

    /**
     * Owning side of the Project ↔ ProjectTeamMember relationship.
     * FetchType.LAZY — loaded only when explicitly accessed.
     *
     * @JsonIgnore prevents Jackson infinite loop if entity is ever serialized
     *             directly.
     */
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;
}
