package com.casainterior.backend.service;

import com.casainterior.backend.dto.inquiry.InquiryRequest;
import com.casainterior.backend.dto.inquiry.InquiryResponse;
import com.casainterior.backend.enums.InquiryStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Inquiry management service contract.
 */
public interface InquiryService {

    /** Submit a new inquiry (public endpoint). */
    InquiryResponse submit(InquiryRequest request);

    /** Admin: paginated list with optional search and status filter. */
    Page<InquiryResponse> findAll(String query, InquiryStatus status, Pageable pageable);

    InquiryResponse findById(Long id);

    InquiryResponse updateStatus(Long id, InquiryStatus newStatus);

    void delete(Long id);
}
