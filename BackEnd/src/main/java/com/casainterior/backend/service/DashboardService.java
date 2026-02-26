package com.casainterior.backend.service;

import com.casainterior.backend.dto.dashboard.ActivityResponse;
import com.casainterior.backend.dto.dashboard.DashboardStatsResponse;

import java.util.List;

/**
 * Dashboard data service contract.
 */
public interface DashboardService {

    DashboardStatsResponse getStats();

    List<ActivityResponse> getRecentActivity();
}
