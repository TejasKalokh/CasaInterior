package com.casainterior.backend.service;

import com.casainterior.backend.dto.auth.AuthResponse;
import com.casainterior.backend.dto.auth.LoginRequest;

/**
 * Authentication service contract.
 */
public interface AuthService {

    /**
     * Authenticates an admin user and returns a JWT.
     *
     * @param request email + password
     * @return JWT token and admin metadata
     */
    AuthResponse login(LoginRequest request);
}
