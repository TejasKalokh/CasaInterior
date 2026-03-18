package com.casainterior.backend.config;

import com.cloudinary.Cloudinary;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

/**
 * Cloudinary configuration.
 *
 * <p>
 * Reads credentials directly from environment variables:
 * CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.
 * No application.yml binding needed — keeps Railway deployment simple.
 *
 * <p>
 * Fails fast at startup if any required env var is missing.
 */
@Configuration
@Slf4j
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        String cloudName = requireEnv("CLOUDINARY_CLOUD_NAME");
        String apiKey = requireEnv("CLOUDINARY_API_KEY");
        String apiSecret = requireEnv("CLOUDINARY_API_SECRET");

        Map<String, Object> config = new HashMap<>();
        config.put("cloud_name", cloudName);
        config.put("api_key", apiKey);
        config.put("api_secret", apiSecret);
        config.put("secure", true);
        config.put("connect_timeout", 60000);
        config.put("timeout", 60000);

        log.info("Cloudinary configured for cloud: {}", cloudName);
        return new Cloudinary(config);
    }

    /**
     * Reads a required environment variable. Fails fast with a clear message
     * if the variable is missing or blank.
     */
    private String requireEnv(String name) {
        String value = System.getenv(name);
        if (value == null || value.isBlank()) {
            throw new IllegalStateException(
                    "Required environment variable '" + name + "' is not set. " +
                    "Set it in your Railway dashboard or local .env file.");
        }
        return value;
    }
}
