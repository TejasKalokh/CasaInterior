package com.casainterior.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

/**
 * JPA entity representing a client testimonial / review.
 * Reviews can be shown or hidden via the active flag.
 */
@Entity
@Table(name = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String author;

    @Column(length = 100)
    private String role;

    @Column(length = 100)
    private String location;

    /** Star rating 1–5 */
    @Column(nullable = false)
    @Builder.Default
    private Integer rating = 5;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String quote;

    /** Whether this review is visible on the public website */
    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
