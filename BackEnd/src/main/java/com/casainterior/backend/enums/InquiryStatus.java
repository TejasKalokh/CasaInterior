package com.casainterior.backend.enums;

/**
 * Lifecycle state of a client Inquiry.
 * Stored as VARCHAR(20) in the database.
 */
public enum InquiryStatus {
    NEW,
    READ,
    ARCHIVED
}
