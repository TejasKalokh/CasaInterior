package com.casainterior.backend.service;

/**
 * Email service for sending branded transactional emails.
 */
public interface EmailService {

    /**
     * Sends a confirmation email to the customer after an inquiry submission.
     *
     * @param toEmail      the customer's email address
     * @param customerName the customer's full name
     * @param projectType  the type of project they inquired about (may be null)
     */
    void sendInquiryConfirmation(String toEmail, String customerName, String projectType);
}
