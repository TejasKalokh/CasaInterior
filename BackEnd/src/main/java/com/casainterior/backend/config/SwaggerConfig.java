package com.casainterior.backend.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.List;

/**
 * Springdoc OpenAPI 3 configuration.
 *
 * <p>
 * Active ONLY on the "dev" profile. The entire bean is excluded from the
 * production Spring context — no Swagger endpoints are registered in prod.
 *
 * <p>
 * Swagger UI: http://localhost:8080/swagger-ui.html (dev only)
 */
@Configuration
@Profile("dev")
public class SwaggerConfig {

        private static final String SECURITY_SCHEME_NAME = "bearerAuth";

        @Bean
        public OpenAPI openAPI() {
                return new OpenAPI()
                                .info(apiInfo())
                                .servers(List.of(
                                                new Server().url("http://localhost:8080")
                                                                .description("Local Development"),
                                                new Server().url("http://localhost:8080")
                                                                .description("Docker Compose")))
                                .addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME))
                                .components(new Components()
                                                .addSecuritySchemes(SECURITY_SCHEME_NAME,
                                                                new SecurityScheme()
                                                                                .name(SECURITY_SCHEME_NAME)
                                                                                .type(SecurityScheme.Type.HTTP)
                                                                                .scheme("bearer")
                                                                                .bearerFormat("JWT")
                                                                                .description(
                                                                                                "Paste your JWT token here. Obtain it from POST /api/auth/login")));
        }

        private Info apiInfo() {
                return new Info()
                                .title("Casa Interior CMS API")
                                .description("""
                                                Production-grade backend API for Casa Interior — an interior design website.

                                                **Public APIs** (no auth): GET /api/projects, GET /api/reviews, POST /api/inquiries

                                                **Admin APIs** (JWT required): All /api/admin/** endpoints.

                                                Login via POST /api/auth/login, copy the token, click Authorize above.
                                                """)
                                .version("1.0.0")
                                .contact(new Contact()
                                                .name("Casa Interior Team")
                                                .email("admin@casainterior.com"))
                                .license(new License().name("Proprietary"));
        }
}
