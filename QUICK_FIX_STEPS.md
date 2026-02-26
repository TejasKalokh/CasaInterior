# Quick Fix Steps - Image 404 Error

## The Problem

Your image returns 404 because it's stored in a Docker volume that's not accessible. The file exists inside the Docker container but not on your Windows machine.

## The Solution (3 Steps)

### Step 1: Restart Docker with New Configuration

I've already updated your `docker-compose.yml` to use a local directory instead of a Docker volume.

Run these commands:

```bash
cd BackEnd
docker-compose down
docker-compose up -d
```

### Step 2: Wait for Backend to Start

Check the logs to make sure the backend started successfully:

```bash
docker-compose logs -f backend
```

Look for this message:
```
File storage initialized at: /app/media
```

Press `Ctrl+C` to stop following the logs.

### Step 3: Re-upload the Image

1. Go to admin panel: `http://localhost:3000/admin/projects`
2. Find project 9 (the one with ID 9)
3. Click the edit button (pencil icon)
4. Re-upload the image
5. Click Save

## Verification

After re-uploading:

1. **Check the file exists on your machine:**
   ```bash
   cd BackEnd
   ls -la media/images/
   ```
   You should see the new image file.

2. **Test direct access:**
   Open in browser: `http://192.168.0.101:8080/media/images/[new-filename].jpg`
   
   Should display the image.

3. **Check landing page:**
   Go to: `http://localhost:3000`
   
   The project image should display.

4. **Check project detail page:**
   Go to: `http://localhost:3000/projects/9`
   
   The hero image should display.

## What Changed?

**Before:**
```yaml
volumes:
  - media_data:/app/media  # Docker volume (hidden)
```

**After:**
```yaml
volumes:
  - ./media:/app/media  # Local directory (visible)
```

Now uploaded files are stored in `BackEnd/media/` on your Windows machine, making them accessible and persistent.

## Why This Matters

- ✅ Files are visible on your Windows machine
- ✅ Files persist even if you delete the Docker container
- ✅ You can backup/manage files easily
- ✅ Easier debugging (you can see what files exist)

## If You Still See 404

If the image still doesn't work after these steps:

1. Check backend logs for errors:
   ```bash
   docker-compose logs backend
   ```

2. Verify the media directory was created:
   ```bash
   ls -la BackEnd/media/
   ```

3. Make sure the project status is "PUBLISHED" (not "ARCHIVED")

4. Clear browser cache: `Ctrl + Shift + R`

## Summary

The issue was that Docker was storing files in an internal volume. I've fixed the configuration to use a local directory instead. Just restart Docker and re-upload the image, and it will work!
