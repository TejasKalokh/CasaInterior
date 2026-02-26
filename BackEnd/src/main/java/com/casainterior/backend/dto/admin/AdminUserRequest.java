package com.casainterior.backend.dto.admin;

import com.casainterior.backend.enums.AdminRole;
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

    /**
     * Role to assign to the new admin. Defaults to ADMIN if not provided.
     * Only a MAIN_ADMIN can create another MAIN_ADMIN via the Settings page.
     */
    private AdminRole role = AdminRole.ADMIN;
}
