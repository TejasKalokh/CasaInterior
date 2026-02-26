package com.casainterior.backend.repository;

import com.casainterior.backend.entity.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for AdminUser entity.
 * Used by CustomUserDetailsService for authentication.
 */
@Repository
public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {

    /** Look up admin by email — used in login flow. */
    Optional<AdminUser> findByEmail(String email);

    /** Check if an email is already registered. */
    boolean existsByEmail(String email);
}
