package com.casainterior.backend.dto.admin;

import jakarta.validation.constraints.*;
import lombok.Data;

/**
 * Request DTO for creating a new AdminUser account.
 * Used by MAIN_ADMIN on the Settings page.
 */
@Data
public class AdminUserRequest {

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be a valid email address")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;
}
