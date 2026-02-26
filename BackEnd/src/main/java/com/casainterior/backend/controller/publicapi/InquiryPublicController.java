package com.casainterior.backend.controller.publicapi;

import com.casainterior.backend.dto.inquiry.InquiryRequest;
import com.casainterior.backend.dto.inquiry.InquiryResponse;
import com.casainterior.backend.service.InquiryService;
import com.casainterior.backend.util.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Public inquiry submission endpoint — no authentication required.
 * Visitors submit inquiries via the contact form.
 */
@RestController
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
@Tag(name = "Public - Inquiries", description = "Public contact form submission")
public class InquiryPublicController {

    private final InquiryService inquiryService;

    @PostMapping
    @Operation(summary = "Submit a new inquiry (contact form)")
    public ResponseEntity<ApiResponse<InquiryResponse>> submitInquiry(
            @Valid @RequestBody InquiryRequest request) {
        InquiryResponse response = inquiryService.submit(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Your inquiry has been submitted. We will be in touch soon!", response));
    }
}
