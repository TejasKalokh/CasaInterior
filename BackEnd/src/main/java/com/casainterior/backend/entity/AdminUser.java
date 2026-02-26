package com.casainterior.backend.entity;

import com.casainterior.backend.converter.AdminRoleConverter;
import com.casainterior.backend.enums.AdminRole;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

/**
 * JPA entity for an administrator account.
 * Implements Spring Security's UserDetails for seamless integration
 * with CustomUserDetailsService.
 */
@Entity
@Table(name = "admin_users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminUser implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    /**
     * Role stored as VARCHAR(20).
     * MAIN_ADMIN has access to Settings; ADMIN has standard access.
     */
    @Convert(converter = AdminRoleConverter.class)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private AdminRole role = AdminRole.ADMIN;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // ============================================================
    // UserDetails implementation
    // ============================================================

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Spring Security expects roles prefixed with "ROLE_"
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getUsername() {
        // We use email as the unique identifier
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
