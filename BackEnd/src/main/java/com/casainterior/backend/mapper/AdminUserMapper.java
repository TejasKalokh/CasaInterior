package com.casainterior.backend.mapper;

import com.casainterior.backend.dto.admin.AdminUserResponse;
import com.casainterior.backend.entity.AdminUser;
import org.springframework.stereotype.Component;

/**
 * Manual mapper for AdminUser ↔ DTO conversions.
 * toEntity is not needed — AdminUserServiceImpl builds the entity directly
 * to ensure the password is always BCrypt-encoded before mapping.
 */
@Component
public class AdminUserMapper {

    public AdminUserResponse toResponse(AdminUser adminUser) {
        return AdminUserResponse.builder()
                .id(adminUser.getId())
                .name(adminUser.getName())
                .email(adminUser.getEmail())
                .role(adminUser.getRole())
                .createdAt(adminUser.getCreatedAt())
                .build();
    }
}
