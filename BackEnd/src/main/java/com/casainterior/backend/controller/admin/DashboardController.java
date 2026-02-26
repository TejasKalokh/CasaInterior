package com.casainterior.backend.controller.admin;

import com.casainterior.backend.dto.dashboard.ActivityResponse;
import com.casainterior.backend.dto.dashboard.DashboardStatsResponse;
import com.casainterior.backend.service.DashboardService;
import com.casainterior.backend.util.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Admin dashboard controller.
 * Provides aggregate stats and recent activity for the dashboard home screen.
 */
@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'MAIN_ADMIN')")
@Tag(name = "Admin - Dashboard", description = "Dashboard statistics and recent activity")
@SecurityRequirement(name = "bearerAuth")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    @Operation(summary = "Get dashboard statistics: counts for projects, inquiries, reviews")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getStats() {
        return ResponseEntity.ok(ApiResponse.success(dashboardService.getStats()));
    }

    @GetMapping("/activity")
    @Operation(summary = "Get 10 most recent activity log entries")
    public ResponseEntity<ApiResponse<List<ActivityResponse>>> getRecentActivity() {
        return ResponseEntity.ok(ApiResponse.success(dashboardService.getRecentActivity()));
    }
}
