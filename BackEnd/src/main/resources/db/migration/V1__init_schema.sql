-- ============================================================
-- V1__init_schema.sql
-- Casa Interior — Initial Database Schema
-- Author: Casa Interior Backend
-- Note: Status columns use VARCHAR(20) — Java enforces via @Enumerated(EnumType.STRING)
-- ============================================================

-- ============================================================
-- TABLE: admin_users
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_users (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100)  NOT NULL,
    email      VARCHAR(150)  NOT NULL UNIQUE,
    password   VARCHAR(255)  NOT NULL,
    role       VARCHAR(20)   NOT NULL DEFAULT 'ADMIN', -- MAIN_ADMIN | ADMIN
    created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: projects
-- ============================================================
CREATE TABLE IF NOT EXISTS projects (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(200)  NOT NULL,
    category    VARCHAR(100)  NULL,
    description TEXT          NULL,
    client      VARCHAR(150)  NULL,
    location    VARCHAR(150)  NULL,
    duration    VARCHAR(50)   NULL,
    year        INT           NULL,
    area        VARCHAR(50)   NULL,
    budget      VARCHAR(50)   NULL,
    challenge   TEXT          NULL,
    solution    TEXT          NULL,
    image_url   VARCHAR(500)  NULL,
    video_url   VARCHAR(500)  NULL,
    status      VARCHAR(20)   NOT NULL DEFAULT 'DRAFT', -- DRAFT | PUBLISHED
    created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_project_status (status),
    INDEX idx_project_created (created_at)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: project_team_members
-- ============================================================
CREATE TABLE IF NOT EXISTS project_team_members (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT       NOT NULL,
    name       VARCHAR(100) NULL,
    role       VARCHAR(100) NULL,
    CONSTRAINT fk_team_project
        FOREIGN KEY (project_id) REFERENCES projects (id)
            ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: inquiries
-- ============================================================
CREATE TABLE IF NOT EXISTS inquiries (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    name         VARCHAR(100) NOT NULL,
    email        VARCHAR(150) NOT NULL,
    phone        VARCHAR(20)  NULL,
    message      TEXT         NOT NULL,
    project_type VARCHAR(100) NULL,
    status       VARCHAR(20)  NOT NULL DEFAULT 'NEW', -- NEW | READ | ARCHIVED
    created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_inquiry_status (status),
    INDEX idx_inquiry_created (created_at)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: reviews
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    author     VARCHAR(100) NOT NULL,
    role       VARCHAR(100) NULL,
    location   VARCHAR(100) NULL,
    rating     INT          NOT NULL DEFAULT 5,
    quote      TEXT         NOT NULL,
    active     BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_review_active (active)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: project_images
-- Stores the multi-image gallery for each project.
-- projects.image_url holds the cover/hero image.
-- ============================================================
CREATE TABLE IF NOT EXISTS project_images (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT       NOT NULL,
    image_url  VARCHAR(500) NULL,
    sort_order INT          NOT NULL DEFAULT 0,
    CONSTRAINT fk_project_image
        FOREIGN KEY (project_id) REFERENCES projects (id)
            ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_project_images_project (project_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: activity_log
-- ============================================================
CREATE TABLE IF NOT EXISTS activity_log (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    type       VARCHAR(50)  NOT NULL, -- e.g. INQUIRY, PROJECT, REVIEW
    message    VARCHAR(255) NOT NULL,
    created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_activity_created (created_at)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ============================================================
-- SEED DATA
-- Default MAIN_ADMIN user
-- Password: admin123  (BCrypt hashed)
-- ============================================================
INSERT INTO admin_users (name, email, password, role)
SELECT 'Main Admin',
       'admin@casainterior.com',
       '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
       'MAIN_ADMIN'
WHERE NOT EXISTS (
    SELECT 1 FROM admin_users WHERE email = 'admin@casainterior.com'
);
