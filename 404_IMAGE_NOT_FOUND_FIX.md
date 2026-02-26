# 404 Image Not Found - DIAGNOSIS & FIX

## Problem

The image URL returns **404 Not Found** instead of displaying the image:
```
http://192.168.0.101:8080/media/images/b038c431-aa7f-41ff-b184-711f0710a8e5.jpg
```

Error in console:
```
b038c431-aa7f-41ff-b184-711f0710a8e5.jpg:1 Failed to load resource: the server responded with a status of 404 (Not Found)
```

## Progress So Far

✅ **403 Forbidden Fixed** - Spring Security now allows public access to `/media/**`
❌ **404 Not Found** - The file doesn't exist in the backend storage

## Root Cause

The file `b038c431-aa7f-41ff-b184-711f0710a8e5.jpg` was never actually saved to the backend's media storage directory. This can happen if:

1. **Backend wasn't restarted** after the SecurityConfig fix
2. **File upload failed** but the database was updated anyway
3. **Media directory doesn't exist** (backend not initialized properly)
4. **File was uploaded to wrong location** (Docker volume mismatch)

## Diagnosis Steps

### Step 1: Check if Backend Media Directory Exists

Run this command:
```bash
cd BackEnd
ls -la media/images/
```

**Expected**: Should show the `media/images/` directory with uploaded files
**If missing**: The backend hasn't created the directory yet

### Step 2: Check Backend Logs

Look for this log message when backend starts:
```
File storage initialized at: G:\CasaInterior\BackEnd\media
```

If you don't see this, the backend didn't initialize properly.

### Step 3: Verify File Upload Worked

Check the backend logs when you uploaded the file. You should see:
```
Stored file 'original-filename.jpg' -> '/media/images/b038c431-aa7f-41ff-b184-711f0710a8e5.jpg'
```

If this log is missing, the upload failed.

## Solution Options

### Option 1: Restart Backend (Recommended)

The SecurityConfig fix requires a backend restart to take effect.

**If using Docker:**
```bash
cd BackEnd
docker-compose restart backend
```

**If running directly:**
```bash
cd BackEnd
# Stop the running application (Ctrl+C if running)
mvn spring-boot:run
```

After restart:
1. The `media/images/` directory will be created automatically
2. Go to admin panel and re-upload the image for project 9
3. The new file will be saved correctly

### Option 2: Manually Create Media Directory

If the backend is running but the directory doesn't exist:

```bash
cd BackEnd
mkdir -p media/images
mkdir -p media/videos
```

Then re-upload the image through the admin panel.

### Option 3: Re-upload the Image

1. Go to admin panel: `http://localhost:3000/admin/projects`
2. Find project 9 (the one with the broken image)
3. Click edit
4. Re-upload the image
5. Save the project

The new upload will create the file correctly.

### Option 4: Fix Docker Volume Mapping (CRITICAL IF USING DOCKER)

**IMPORTANT**: Your `docker-compose.yml` currently uses a Docker volume instead of a local directory:

```yaml
volumes:
  - media_data:/app/media  # ❌ Docker volume (not visible on host)
```

This means files are stored inside Docker and not accessible from your Windows machine. To fix this:

**Step 1: Update docker-compose.yml**

Change the backend volumes section from:
```yaml
volumes:
  - media_data:/app/media
```

To:
```yaml
volumes:
  - ./media:/app/media  # ✅ Local directory (visible on host)
```

**Step 2: Remove the media_data volume definition**

In the volumes section at the bottom, remove:
```yaml
media_data:
  driver: local
```

**Step 3: Restart Docker Compose**

```bash
cd BackEnd
docker-compose down
docker-compose up -d
```

**Step 4: Verify the media directory was created**

```bash
cd BackEnd
ls -la media/images/
```

**Step 5: Re-upload the image**

Go to admin panel and re-upload the image for project 9.

## Verification Steps

After applying the fix:

### 1. Check Directory Exists
```bash
cd BackEnd
ls -la media/images/
```

Should show files like:
```
b038c431-aa7f-41ff-b184-711f0710a8e5.jpg
```

### 2. Test Direct Access

Open in browser:
```
http://192.168.0.101:8080/media/images/b038c431-aa7f-41ff-b184-711f0710a8e5.jpg
```

Should display the image (not 404).

### 3. Test on Landing Page

Go to: `http://localhost:3000`

The project image should now display correctly.

### 4. Test on Project Detail Page

Go to: `http://localhost:3000/projects/9`

The hero image should display correctly.

## Why This Happened

The file upload process has two steps:

1. **Upload file** → Backend saves to `media/images/` and returns URL
2. **Save project** → Frontend sends project data with the URL to backend

If step 1 fails (e.g., backend not running, directory doesn't exist, permission issue), the frontend might still proceed with step 2, saving the URL to the database even though the file doesn't exist.

## Prevention

To prevent this in the future:

1. **Always restart backend** after configuration changes
2. **Check backend logs** for file upload success messages
3. **Test image display** immediately after upload
4. **Use Docker volumes** to persist media files across container restarts

## Current Status

- ✅ Spring Security allows `/media/**` access
- ✅ WebMvcConfig maps `/media/**` to file storage
- ✅ FileStorageService creates directories on startup
- ❌ Media directory doesn't exist (backend needs restart)
- ❌ File wasn't uploaded successfully

## Next Steps

1. **Restart the backend** (this will create the media directory)
2. **Re-upload the image** through the admin panel
3. **Verify the image displays** on both landing page and project detail page

## Technical Details

### File Storage Configuration

**application.yml:**
```yaml
app:
  file:
    storage-path: ${FILE_STORAGE_PATH:./media}
```

**.env:**
```
FILE_STORAGE_PATH=./media
```

### File Storage Implementation

The `FileStorageServiceImpl` has a `@PostConstruct` method that runs when the application starts:

```java
@PostConstruct
public void init() {
    rootLocation = Paths.get(storagePath).toAbsolutePath().normalize();
    try {
        Files.createDirectories(rootLocation);
        log.info("File storage initialized at: {}", rootLocation);
    } catch (IOException ex) {
        throw new RuntimeException("Could not initialize file storage at: " + rootLocation, ex);
    }
}
```

This creates the `media/` directory automatically. If you don't see this directory, the backend hasn't been restarted since the code was deployed.

### URL Mapping

**WebMvcConfig:**
```java
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    String absolutePath = Paths.get(storagePath).toAbsolutePath().normalize().toString();
    registry
            .addResourceHandler("/media/**")
            .addResourceLocations("file:" + absolutePath + "/");
}
```

This maps `http://localhost:8080/media/images/file.jpg` to `BackEnd/media/images/file.jpg` on disk.

## Summary

The 404 error means the file doesn't exist on disk. The most likely cause is that the backend hasn't been restarted after the SecurityConfig fix, so the media directory was never created. 

**Action Required**: Restart the backend, then re-upload the image through the admin panel.
