package com.casainterior.backend.security;

import com.casainterior.backend.repository.AdminUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Spring Security UserDetailsService implementation.
 * Loads AdminUser by email for authentication and JWT validation.
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AdminUserRepository adminUserRepository;

    /**
     * Loads an admin user by their email address.
     * Spring Security calls this during authentication and JWT filter processing.
     *
     * @param email the admin's email (used as Spring Security username)
     * @throws UsernameNotFoundException if no admin exists with this email
     */
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return adminUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Admin user not found with email: " + email));
    }
}
