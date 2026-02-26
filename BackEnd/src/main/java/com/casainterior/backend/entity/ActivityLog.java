package com.casainterior.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

/**
 * Audit log entry for significant system events.
 * Used by the Dashboard to show recent activity.
 * Events are written when: inquiries are created, projects are published.
 */
@Entity
@Table(name = "activity_log")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Event category. Examples: INQUIRY, PROJECT, REVIEW
     */
    @Column(nullable = false, length = 50)
    private String type;

    /**
     * Human-readable description of the event.
     * Example: "New inquiry received from Priya Sharma"
     */
    @Column(nullable = false, length = 255)
    private String message;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
