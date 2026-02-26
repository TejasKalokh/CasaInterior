package com.casainterior.backend.enums;

/**
 * Represents the lifecycle state of a Project.
 * Stored as VARCHAR(20) in the database via @Enumerated(EnumType.STRING).
 */
public enum ProjectStatus {
    DRAFT,
    PUBLISHED,
    ARCHIVED
}
