# Casa Interior — Production Deployment Guide

**Target**: Ubuntu 22.04 LTS VPS (2 vCPU / 2 GB RAM minimum)
**Stack**: Docker, Docker Compose, Nginx, Certbot (Let's Encrypt)

---

## Prerequisites on the VPS

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

# 3. Install Docker Compose plugin
sudo apt install -y docker-compose-plugin

# 4. Install Nginx + Certbot
sudo apt install -y nginx certbot python3-certbot-nginx

# 5. Configure firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

---

## Repository Setup

```bash
# Clone the project
git clone https://github.com/your-org/casainterior.git /opt/casainterior
cd /opt/casainterior
```

---

## Environment Configuration

```bash
# 1. Create .env from the production template
cp .env.production.template BackEnd/.env

# 2. Fill in ALL values — no defaults are accepted
nano BackEnd/.env

# Generate JWT_SECRET
openssl rand -base64 64

# Generate DB passwords
openssl rand -base64 32
```

> **Required variables** — deployment will fail if any are blank:
> - `MYSQL_ROOT_PASSWORD`
> - `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`
> - `JWT_SECRET` (Base64-encoded, ≥ 32 bytes decoded)
> - `CORS_ORIGINS` (exact frontend origin, no trailing slash)

---

## SSL Certificates

```bash
# Obtain certificates BEFORE starting Nginx in proxy mode
# (Nginx must be running in HTTP-only mode first)
sudo certbot certonly --nginx \
  -d yourdomain.com \
  -d api.yourdomain.com \
  --non-interactive \
  --agree-tos \
  --email admin@yourdomain.com
```

---

## Nginx Configuration

```bash
# Install the Nginx config
sudo cp /opt/casainterior/nginx.conf /etc/nginx/sites-available/casainterior

# Update domain names in the config
sudo sed -i 's/yourdomain.com/ACTUAL_DOMAIN/g' /etc/nginx/sites-available/casainterior

# Enable the site
sudo ln -s /etc/nginx/sites-available/casainterior /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Validate and reload
sudo nginx -t && sudo systemctl reload nginx
```

---

## Build and Deploy Backend

```bash
cd /opt/casainterior/BackEnd

# Build and start (first run downloads images, builds JAR)
docker compose --env-file .env up -d --build

# Watch logs until healthy
docker compose logs -f backend
# Expect: "Started CasaInteriorApplication in X seconds"
```

---

## Deploy Frontend (Next.js)

```bash
cd /opt/casainterior/FrontEnd

# Install dependencies
npm ci --production=false

# Build production bundle
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api npm run build

# Start Next.js (using PM2 for process management)
sudo npm install -g pm2
pm2 start npm --name "casainterior-frontend" -- start
pm2 save
pm2 startup
```

---

## Smoke Test Checklist

Run these checks immediately after deployment:

| # | Check | Command / URL | Expected |
|---|---|---|---|
| 1 | Backend health | `curl https://api.yourdomain.com/actuator/health` | `{"status":"UP"}` |
| 2 | Swagger absent in prod | `curl -I https://api.yourdomain.com/swagger-ui.html` | `404` |
| 3 | Login returns JWT | `POST https://api.yourdomain.com/api/auth/login` with creds | `200 + token` |
| 4 | Unauthenticated admin route | `GET https://api.yourdomain.com/api/admin/users` (no token) | `401` |
| 5 | File upload rejects GIF | Upload a `.gif` via admin → media step | `400 Bad Request` |
| 6 | File upload rejects EXE | Upload a `.exe` via admin → media step | `400 Bad Request` |
| 7 | Public projects page loads | `https://yourdomain.com` | Projects visible |
| 8 | Admin login works | `https://yourdomain.com/admin/login` | Redirects to dashboard |
| 9 | 50MB upload allowed | Upload a valid 40MB `.mp4` via admin | `200 OK`, file stored |
| 10 | Stack trace not in 500 | Trigger invalid request, check response body | No Java stacktrace |

---

## Database Backup

```bash
# Daily backup to compressed file
docker exec casa_interior_mysql \
  mysqldump \
    --single-transaction \
    --routines \
    --triggers \
    --set-gtid-purged=OFF \
    -u root -p"${MYSQL_ROOT_PASSWORD}" \
    casa_interior_db \
  | gzip > /opt/backups/casainterior_$(date +%Y%m%d_%H%M%S).sql.gz
```

**Automate with cron** (`crontab -e`):
```
0 2 * * * /opt/casainterior/scripts/backup.sh >> /var/log/casainterior-backup.log 2>&1
```

---

## Rollback Procedure

```bash
cd /opt/casainterior/BackEnd

# Stop current containers
docker compose down

# Revert to previous image tag (if using versioned images)
git checkout tags/v1.x.x

# Rebuild and restart
docker compose --env-file .env up -d --build
```

> **Database**: Flyway migrations are additive. Rolling back a migration requires a manual reverse script — never run `ddl-auto: update` to recover.

---

## SSL Auto-Renewal

Certbot installs a systemd timer automatically. Verify:

```bash
sudo systemctl status certbot.timer
# Should show: active (waiting)

# Test renewal without actually renewing
sudo certbot renew --dry-run
```

---

## Monitoring

```bash
# Container status
docker compose ps

# Live backend logs
docker compose logs -f backend --tail=100

# Resource usage
docker stats

# Nginx access/error logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```
