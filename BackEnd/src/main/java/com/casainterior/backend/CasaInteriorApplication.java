package com.casainterior.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Casa Interior Backend — Main Application Entry Point
 *
 * <p>
 * Production-grade CMS backend serving:
 * <ul>
 * <li>Public website APIs (projects, reviews)</li>
 * <li>Admin dashboard APIs (full CRUD, inquiries, settings)</li>
 * </ul>
 *
 * @author Casa Interior Team
 * @version 1.0.0
 */
@SpringBootApplication
public class CasaInteriorApplication {

    public static void main(String[] args) {
        SpringApplication.run(CasaInteriorApplication.class, args);
    }
}
