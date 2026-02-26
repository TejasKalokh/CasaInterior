package com.casainterior.backend.dto.inquiry;

import com.casainterior.backend.enums.InquiryStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Response DTO for Inquiry, used in both admin list view and single fetch.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InquiryResponse {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String message;
    private String projectType;
    private InquiryStatus status;
    private LocalDateTime createdAt;
}
