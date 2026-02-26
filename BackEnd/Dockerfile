# ============================================================
# Stage 1: Build (Maven + JDK)
# ============================================================
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy pom.xml first for dependency caching
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN mvn clean package -DskipTests


# ============================================================
# Stage 2: Runtime (JRE only)
# ============================================================
FROM eclipse-temurin:17-jre-alpine AS runtime

WORKDIR /app

# Create non-root user
RUN addgroup -S casagroup && adduser -S casauser -G casagroup

# Media folder for uploads
RUN mkdir -p /app/media && chown casauser:casagroup /app/media

# Copy built jar
COPY --from=builder /app/target/casa-interior-backend-*.jar app.jar

USER casauser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget -qO- http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-Dspring.profiles.active=docker", \
  "-jar", "app.jar"]