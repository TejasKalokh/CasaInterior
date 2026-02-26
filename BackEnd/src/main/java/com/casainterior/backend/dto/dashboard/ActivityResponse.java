package com.casainterior.backend.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Single activity entry for the dashboard recent activity feed.
 * Returned as a list by GET /api/admin/dashboard/activity
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityResponse {

    private Long id;

    /** Event category, e.g. "INQUIRY", "PROJECT", "REVIEW" */
    private String type;

    /** Human-readable description of the event */
    private String message;

    private LocalDateTime createdAt;
}
