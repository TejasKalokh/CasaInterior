package com.casainterior.backend.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Dashboard statistics snapshot.
 * Returned by GET /api/admin/dashboard/stats
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {

    private long totalProjects;
    private long publishedProjects;
    private long draftProjects;
    private long totalInquiries;
    private long newInquiries;
    private long totalReviews;
    private long activeReviews;
}
