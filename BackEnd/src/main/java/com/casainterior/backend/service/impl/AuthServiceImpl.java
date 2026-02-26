package com.casainterior.backend.service.impl;

import com.casainterior.backend.dto.auth.AuthResponse;
import com.casainterior.backend.dto.auth.LoginRequest;
import com.casainterior.backend.entity.AdminUser;
import com.casainterior.backend.security.JwtUtil;
import com.casainterior.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

/**
 * Authentication service implementation.
 * Delegates credential verification to Spring Security's AuthenticationManager,
 * then generates a JWT for the authenticated admin.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Override
    public AuthResponse login(LoginRequest request) {
        // Authenticate (throws BadCredentialsException on failure → handled by
        // GlobalExceptionHandler)
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        AdminUser admin = (AdminUser) authentication.getPrincipal();
        String token = jwtUtil.generateToken(admin.getEmail());

        log.info("Admin '{}' logged in successfully", admin.getEmail());

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .expiresIn(jwtUtil.getExpirationMs())
                .adminId(admin.getId())
                .name(admin.getName())
                .email(admin.getEmail())
                .role(admin.getRole())
                .build();
    }
}
