package com.casainterior.backend.mapper;

import com.casainterior.backend.dto.inquiry.InquiryRequest;
import com.casainterior.backend.dto.inquiry.InquiryResponse;
import com.casainterior.backend.entity.Inquiry;
import org.springframework.stereotype.Component;

/**
 * Manual mapper for Inquiry ↔ DTO conversions.
 */
@Component
public class InquiryMapper {

    public Inquiry toEntity(InquiryRequest request) {
        return Inquiry.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .message(request.getMessage())
                .projectType(request.getProjectType())
                .build();
    }

    public InquiryResponse toResponse(Inquiry inquiry) {
        return InquiryResponse.builder()
                .id(inquiry.getId())
                .name(inquiry.getName())
                .email(inquiry.getEmail())
                .phone(inquiry.getPhone())
                .message(inquiry.getMessage())
                .projectType(inquiry.getProjectType())
                .status(inquiry.getStatus())
                .createdAt(inquiry.getCreatedAt())
                .build();
    }
}
