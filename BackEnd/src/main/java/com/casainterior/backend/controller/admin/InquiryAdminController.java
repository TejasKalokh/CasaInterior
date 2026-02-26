package com.casainterior.backend.controller.admin;

import com.casainterior.backend.dto.inquiry.InquiryResponse;
import com.casainterior.backend.enums.InquiryStatus;
import com.casainterior.backend.service.InquiryService;
import com.casainterior.backend.util.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Admin inquiry management controller.
 * Supports paginated listing with search and status filtering.
 */
@RestController
@RequestMapping("/api/admin/inquiries")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'MAIN_ADMIN')")
@Tag(name = "Admin - Inquiries", description = "Inquiry management: search, filter, status, delete")
@SecurityRequirement(name = "bearerAuth")
public class InquiryAdminController {

    private final InquiryService inquiryService;

    @GetMapping
    @Operation(summary = "List inquiries with optional search and status filter (paginated)")
    public ResponseEntity<ApiResponse<Page<InquiryResponse>>> getInquiries(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) InquiryStatus status,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<InquiryResponse> inquiries = inquiryService.findAll(query, status, pageable);
        return ResponseEntity.ok(ApiResponse.success(inquiries));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single inquiry by id")
    public ResponseEntity<ApiResponse<InquiryResponse>> getInquiry(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(inquiryService.findById(id)));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Update inquiry status (NEW → READ → ARCHIVED)")
    public ResponseEntity<ApiResponse<InquiryResponse>> updateStatus(
            @PathVariable Long id,
            @RequestParam InquiryStatus status) {
        return ResponseEntity.ok(
                ApiResponse.success("Status updated to " + status, inquiryService.updateStatus(id, status)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an inquiry permanently")
    public ResponseEntity<ApiResponse<Void>> deleteInquiry(@PathVariable Long id) {
        inquiryService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Inquiry deleted successfully"));
    }
}
