package com.casainterior.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

/**
 * Web MVC configuration.
 *
 * <p>
 * Maps the /media/** URL pattern to the local file storage directory,
 * so uploaded files are accessible via
 * http://localhost:8080/media/images/uuid.jpg
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("${app.file.storage-path}")
    private String storagePath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String absolutePath = Paths.get(storagePath).toAbsolutePath().normalize().toString();
        registry
                .addResourceHandler("/media/**")
                .addResourceLocations("file:" + absolutePath + "/");
    }
}
