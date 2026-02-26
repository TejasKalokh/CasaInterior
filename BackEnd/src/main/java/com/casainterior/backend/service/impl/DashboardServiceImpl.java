package com.casainterior.backend.service.impl;

import com.casainterior.backend.dto.dashboard.ActivityResponse;
import com.casainterior.backend.dto.dashboard.DashboardStatsResponse;
import com.casainterior.backend.enums.InquiryStatus;
import com.casainterior.backend.enums.ProjectStatus;
import com.casainterior.backend.repository.ActivityLogRepository;
import com.casainterior.backend.repository.InquiryRepository;
import com.casainterior.backend.repository.ProjectRepository;
import com.casainterior.backend.repository.ReviewRepository;
import com.casainterior.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Dashboard service implementation.
 * Aggregates counts from all domain repositories and fetches the 10 most recent
 * activity log entries.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {

        private final ProjectRepository projectRepository;
        private final InquiryRepository inquiryRepository;
        private final ReviewRepository reviewRepository;
        private final ActivityLogRepository activityLogRepository;

        @Override
        public DashboardStatsResponse getStats() {
                long totalProjects = projectRepository.count();
                long published = projectRepository.countByStatus(ProjectStatus.PUBLISHED);
                long draft = projectRepository.countByStatus(ProjectStatus.DRAFT);
                long totalInquiries = inquiryRepository.count();
                long newInquiries = inquiryRepository.countByStatus(InquiryStatus.NEW);
                long totalReviews = reviewRepository.count();

                // Active reviews counted via repository findByActiveTrue size
                long activeReviews = reviewRepository.findByActiveTrue(
                                org.springframework.data.domain.Pageable.unpaged()).getTotalElements();

                return DashboardStatsResponse.builder()
                                .totalProjects(totalProjects)
                                .publishedProjects(published)
                                .draftProjects(draft)
                                .totalInquiries(totalInquiries)
                                .newInquiries(newInquiries)
                                .totalReviews(totalReviews)
                                .activeReviews(activeReviews)
                                .build();
        }

        @Override
        public List<ActivityResponse> getRecentActivity() {
                return activityLogRepository.findTop10ByOrderByCreatedAtDesc()
                                .stream()
                                .map(log -> ActivityResponse.builder()
                                                .id(log.getId())
                                                .type(log.getType())
                                                .message(log.getMessage())
                                                .createdAt(log.getCreatedAt())
                                                .build())
                                .toList();
        }
}
