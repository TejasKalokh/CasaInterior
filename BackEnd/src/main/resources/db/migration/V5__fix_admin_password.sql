-- ============================================================
-- V5__fix_admin_password.sql
-- Resets the MAIN_ADMIN password to admin123.
-- The original hash in V1 was incorrect.
-- BCrypt(10) hash of: admin123
-- ============================================================

UPDATE admin_users
SET password = '$2a$10$mR/wP6DaUKu1.iHPD0x0eeCjFjJbnlJRCwe0DfU6A1bY8m4ciF6oO'
WHERE email = 'admin@casainterior.com';
