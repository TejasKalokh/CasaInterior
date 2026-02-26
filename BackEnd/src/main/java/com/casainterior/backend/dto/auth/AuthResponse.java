package com.casainterior.backend.dto.auth;

import com.casainterior.backend.enums.AdminRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response body for successful authentication.
 * Returns the JWT and basic user info.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private String tokenType;
    private Long expiresIn; // milliseconds
    private Long adminId;
    private String name;
    private String email;
    private AdminRole role;
}
