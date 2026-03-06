package com.casainterior.backend.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

/**
 * Caffeine in-memory cache configuration.
 * Cached data expires after 5 minutes (TTL) or if unused for 10 minutes (idle).
 * Cache is evicted explicitly on any admin write operation.
 */
@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager manager = new CaffeineCacheManager(
                "projects", // public paginated project list
                "projectDetail", // individual project by id
                "reviews" // public active reviews list
        );
        manager.setCaffeine(Caffeine.newBuilder()
                .expireAfterWrite(5, TimeUnit.MINUTES)
                .expireAfterAccess(10, TimeUnit.MINUTES)
                .maximumSize(100)
                .softValues());
        return manager;
    }
}
