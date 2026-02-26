package com.casainterior.backend.controller.admin;

import com.casainterior.backend.dto.admin.AdminUserRequest;
import com.casainterior.backend.dto.admin.AdminUserResponse;
import com.casainterior.backend.service.AdminUserService;
import com.casainterior.backend.util.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Admin user management controller.
 * ALL endpoints here require MAIN_ADMIN role — enforced via @PreAuthorize.
 * This is separate from AuthController — this section is the Settings > Admin
 * Management page.
 */
@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('MAIN_ADMIN')")
@Tag(name = "Admin - User Management", description = "Admin account management (MAIN_ADMIN only)")
@SecurityRequirement(name = "bearerAuth")
public class AdminUserController {

    private final AdminUserService adminUserService;

    @GetMapping
    @Operation(summary = "List all admin accounts (paginated) — MAIN_ADMIN only")
    public ResponseEntity<ApiResponse<Page<AdminUserResponse>>> getAllAdmins(
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(adminUserService.findAll(pageable)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get admin user by id — MAIN_ADMIN only")
    public ResponseEntity<ApiResponse<AdminUserResponse>> getAdmin(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(adminUserService.findById(id)));
    }

    @PostMapping
    @Operation(summary = "Create a new ADMIN user — MAIN_ADMIN only")
    public ResponseEntity<ApiResponse<AdminUserResponse>> createAdmin(
            @Valid @RequestBody AdminUserRequest request) {
        AdminUserResponse created = adminUserService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Admin user created", created));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an admin user — MAIN_ADMIN only")
    public ResponseEntity<ApiResponse<Void>> deleteAdmin(@PathVariable Long id) {
        adminUserService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Admin user deleted"));
    }
}
