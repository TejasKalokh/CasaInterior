package com.casainterior.backend.service;

import com.casainterior.backend.dto.admin.AdminUserRequest;
import com.casainterior.backend.dto.admin.AdminUserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Admin user management service contract.
 * Operations restricted to MAIN_ADMIN at controller level.
 */
public interface AdminUserService {

    Page<AdminUserResponse> findAll(Pageable pageable);

    AdminUserResponse findById(Long id);

    AdminUserResponse create(AdminUserRequest request);

    void delete(Long id);
}
