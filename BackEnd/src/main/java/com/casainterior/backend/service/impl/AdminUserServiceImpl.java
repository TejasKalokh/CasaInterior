package com.casainterior.backend.service.impl;

import com.casainterior.backend.dto.admin.AdminUserRequest;
import com.casainterior.backend.dto.admin.AdminUserResponse;
import com.casainterior.backend.entity.AdminUser;
import com.casainterior.backend.enums.AdminRole;
import com.casainterior.backend.exception.ResourceNotFoundException;
import com.casainterior.backend.mapper.AdminUserMapper;
import com.casainterior.backend.repository.AdminUserRepository;
import com.casainterior.backend.service.AdminUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Admin user management service.
 * New admins always get the ADMIN role — MAIN_ADMIN role can only be set via
 * DB.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AdminUserServiceImpl implements AdminUserService {

    private final AdminUserRepository adminUserRepository;
    private final AdminUserMapper adminUserMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public Page<AdminUserResponse> findAll(Pageable pageable) {
        return adminUserRepository.findAll(pageable)
                .map(adminUserMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public AdminUserResponse findById(Long id) {
        AdminUser user = adminUserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AdminUser", "id", id));
        return adminUserMapper.toResponse(user);
    }

    @Override
    public AdminUserResponse create(AdminUserRequest request) {
        if (adminUserRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException(
                    "An admin with email '" + request.getEmail() + "' already exists");
        }

        AdminUser user = AdminUser.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(AdminRole.ADMIN) // New admins always start as ADMIN
                .build();

        AdminUser saved = adminUserRepository.save(user);
        log.info("Created new admin user '{}' with email '{}'", saved.getName(), saved.getEmail());
        return adminUserMapper.toResponse(saved);
    }

    @Override
    public void delete(Long id) {
        AdminUser user = adminUserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AdminUser", "id", id));
        adminUserRepository.delete(user);
        log.info("Deleted admin user id={}", id);
    }
}
