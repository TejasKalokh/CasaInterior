# Image Not Visible - Debugging Guide

## Current Issue

Project images are not displaying on the main landing page even after the project is published.

## Root Cause Analysis

The issue is related to how image URLs are constructed and served between the backend and frontend.

### How It Should Work

1. **Upload**: Admin uploads image → Backend stores at `./media/images/uuid.jpg`
2. **Database**: Backend saves URL as `/media/images/uuid.jpg` in database
3. **Serve**: Backend serves file at `http://localhost:8080/media/images/uuid.jpg`
4. **Display**: Frontend constructs full URL and displays image

### What's Happening

The frontend needs to convert the relative path `/media/images/uuid.jpg` to the full backend URL `http://localhost:8080/media/images/uuid.jpg`.

## Debugging Steps

### Step 1: Check Browser Console

1. Open the landing page: `http://localhost:3000`
2. Open browser DevTools (F12)
3. Go to Console tab
4. Look for log messages like:
   ```
   [mapListItem] Constructed media URL: http://localhost:8080/media/images/xxx.jpg from /media/images/xxx.jpg
   [mapListItem] Final image URL for project 9 : http://localhost:8080/media/images/xxx.jpg
   ```

### Step 2: Check Network Tab

1. In DevTools, go to Network tab
2. Filter by "Img"
3. Refresh the page
4. Look for requests to `/media/images/...`
5. Check if they return:
   - **200 OK** ✅ Image loaded successfully
   - **404 Not Found** ❌ Image file doesn't exist
   - **Failed** ❌ Backend not running or CORS issue

### Step 3: Verify Backend is Serving Files

Test the media endpoint directly:

```bash
# Check if backend is running
curl http://localhost:8080/actuator/health

# Check if media files are accessible (replace with actual filename)
curl -I http://localhost:8080/media/images/your-uuid-here.jpg
```

Expected response:
```
HTTP/1.1 200 OK
Content-Type: image/jpeg
Content-Length: xxxxx
```

### Step 4: Check Database

Verify the image URL is stored correctly in the database:

```sql
SELECT id, title, image_url, status FROM projects WHERE id = 9;
```

Expected result:
```
id | title  | image_url                        | status
9  | wwewe  | /media/images/uuid.jpg          | PUBLISHED
```

### Step 5: Check File System

Verify the file actually exists on disk:

**Windows:**
```bash
dir BackEnd\media\images
```

**Linux/Mac:**
```bash
ls -la BackEnd/media/images/
```

You should see files like `abc123-def456-ghi789.jpg`

## Common Issues & Solutions

### Issue 1: Image URL is NULL or Empty

**Symptom**: Database shows `image_url` as NULL

**Solution**:
1. Edit the project in admin panel
2. Go to Media step
3. Upload the image again
4. Save the project

### Issue 2: File Doesn't Exist on Disk

**Symptom**: Database has URL but file is missing from `BackEnd/media/images/`

**Solution**:
1. The upload might have failed
2. Re-upload the image through admin panel
3. Check backend logs for upload errors

### Issue 3: CORS Error

**Symptom**: Browser console shows CORS error when loading image

**Solution**:
Check `BackEnd/src/main/resources/application.yml`:
```yaml
app:
  cors:
    allowed-origins: ${CORS_ORIGINS:http://localhost:3000}
```

Ensure `CORS_ORIGINS` in `.env` includes your frontend URL.

### Issue 4: Wrong Base URL

**Symptom**: Image URL points to wrong server

**Solution**:
Check `FrontEnd/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

This should match your backend URL.

### Issue 5: Backend Not Running

**Symptom**: All image requests fail

**Solution**:
```bash
cd BackEnd
docker-compose up -d
# Or if running without Docker:
mvn spring-boot:run
```

## Quick Fix Checklist

- [ ] Backend is running on port 8080
- [ ] Frontend is running on port 3000
- [ ] Project status is PUBLISHED (not DRAFT or ARCHIVED)
- [ ] Image URL in database starts with `/media/`
- [ ] Image file exists in `BackEnd/media/images/` directory
- [ ] `NEXT_PUBLIC_API_URL` is set to `http://localhost:8080/api`
- [ ] Browser console shows no CORS errors
- [ ] Network tab shows 200 OK for image requests

## Testing the Fix

### Test 1: Direct URL Access

Open in browser:
```
http://localhost:8080/media/images/your-file-name.jpg
```

If this works, the backend is serving files correctly.

### Test 2: API Response

Check what the API returns:
```bash
curl http://localhost:8080/api/projects | jq
```

Look for the `imageUrl` field in the response.

### Test 3: Frontend Fetch

Check browser console for the constructed URL:
```javascript
// Should see logs like:
[mapListItem] Constructed media URL: http://localhost:8080/media/images/xxx.jpg
```

## Manual Fix (If Needed)

If the image URL in the database is wrong, you can fix it manually:

```sql
-- Check current value
SELECT id, title, image_url FROM projects WHERE id = 9;

-- Update to correct format (replace with actual filename)
UPDATE projects 
SET image_url = '/media/images/your-actual-filename.jpg' 
WHERE id = 9;
```

## Code Changes Made

### 1. Added Debugging Logs

**File**: `FrontEnd/lib/api/projects.ts`

Added console.log statements to track URL construction:
```typescript
console.log('[mapListItem] Constructed media URL:', imageUrl, 'from', p.imageUrl);
console.log('[mapListItem] Final image URL for project', p.id, ':', imageUrl);
```

### 2. Added Fallback for Missing Images

**File**: `FrontEnd/components/sections/Projects.tsx`

Added fallback background color when image is missing:
```typescript
backgroundImage: p.image ? `url('${p.image}')` : 'none',
backgroundColor: p.image ? 'transparent' : '#e5e5e5',
```

### 3. Improved Caching

**File**: `FrontEnd/lib/api/projects.ts`

Reduced cache time and added no-store directive for fresh data.

## Next Steps

1. **Check browser console** for the debug logs
2. **Check network tab** for failed image requests
3. **Verify backend is running** and serving files
4. **Check database** for correct image URL
5. **Re-upload image** if necessary

## Expected Behavior After Fix

1. Upload image in admin panel → File saved to `BackEnd/media/images/uuid.jpg`
2. Database stores `/media/images/uuid.jpg`
3. Frontend fetches project data
4. Frontend constructs `http://localhost:8080/media/images/uuid.jpg`
5. Browser loads image successfully
6. Image displays on landing page

## Still Not Working?

If images still don't show after following all steps:

1. **Clear browser cache**: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
2. **Restart backend**: `docker-compose restart` or restart Spring Boot
3. **Restart frontend**: Stop and run `npm run dev` again
4. **Check firewall**: Ensure port 8080 is not blocked
5. **Try different browser**: Rule out browser-specific issues

## Contact Information

If the issue persists, provide:
- Browser console logs
- Network tab screenshot
- Database query result for the project
- Backend logs from `docker-compose logs backend`
