package com.casainterior.backend.service.impl;

import com.casainterior.backend.dto.inquiry.InquiryRequest;
import com.casainterior.backend.dto.inquiry.InquiryResponse;
import com.casainterior.backend.entity.ActivityLog;
import com.casainterior.backend.entity.Inquiry;
import com.casainterior.backend.enums.InquiryStatus;
import com.casainterior.backend.exception.ResourceNotFoundException;
import com.casainterior.backend.mapper.InquiryMapper;
import com.casainterior.backend.repository.ActivityLogRepository;
import com.casainterior.backend.repository.InquiryRepository;
import com.casainterior.backend.service.EmailService;
import com.casainterior.backend.service.InquiryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

/**
 * Inquiry service implementation.
 * Writes to activity_log on new inquiry creation.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class InquiryServiceImpl implements InquiryService {

    private final InquiryRepository inquiryRepository;
    private final ActivityLogRepository activityLogRepository;
    private final InquiryMapper inquiryMapper;
    private final EmailService emailService;

    @Override
    public InquiryResponse submit(InquiryRequest request) {
        Inquiry inquiry = inquiryMapper.toEntity(request);
        Inquiry saved = inquiryRepository.save(inquiry);

        // Log to activity feed
        activityLogRepository.save(ActivityLog.builder()
                .type("INQUIRY")
                .message("New inquiry received from " + saved.getName())
                .build());

        // Send async confirmation email (fire-and-forget)
        emailService.sendInquiryConfirmation(saved.getEmail(), saved.getName(), request.getProjectType());

        log.info("New inquiry submitted by '{}' ({})", saved.getName(), saved.getEmail());
        return inquiryMapper.toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<InquiryResponse> findAll(String query, InquiryStatus status, Pageable pageable) {
        // If no filters provided, return all; otherwise use search JPQL
        if (!StringUtils.hasText(query) && status == null) {
            return inquiryRepository.findAll(pageable)
                    .map(inquiryMapper::toResponse);
        }
        return inquiryRepository.searchInquiries(
                StringUtils.hasText(query) ? query : null,
                status,
                pageable).map(inquiryMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public InquiryResponse findById(Long id) {
        return inquiryMapper.toResponse(findInquiryById(id));
    }

    @Override
    public InquiryResponse updateStatus(Long id, InquiryStatus newStatus) {
        Inquiry inquiry = findInquiryById(id);
        inquiry.setStatus(newStatus);
        Inquiry saved = inquiryRepository.save(inquiry);
        log.info("Inquiry id={} status updated to {}", id, newStatus);
        return inquiryMapper.toResponse(saved);
    }

    @Override
    public void delete(Long id) {
        Inquiry inquiry = findInquiryById(id);
        inquiryRepository.delete(inquiry);
        log.info("Deleted inquiry id={}", id);
    }

    private Inquiry findInquiryById(Long id) {
        return inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry", "id", id));
    }
}
