# Casa Interior - Project Image Display Issue Fix

## Problem Description

When an admin adds a new project, the image is not displayed on the main landing page.

## Root Causes Identified

### 1. **Project Status Issue** (PRIMARY CAUSE)
- The public landing page only displays projects with status = `PUBLISHED`
- From your screenshot, the project has status = `Archived`
- **Archived projects are intentionally hidden from the public website**

### 2. **Next.js Caching**
- The homepage was using 60-second revalidation
- This means new projects might not appear for up to 60 seconds after publishing

### 3. **Image URL Construction**
- Image URLs need proper handling for different sources:
  - Backend media files: `/media/...` → `http://localhost:8080/media/...`
  - Next.js public folder: `/images/...` → served directly
  - External URLs: `http://...` → used as-is

## Solutions Applied

### Fix 1: Improved Caching Strategy
**File**: `FrontEnd/lib/api/projects.ts`

**Changes**:
- Reduced revalidation time from 60 seconds to 10 seconds
- Added `cache: 'no-store'` to always fetch fresh data
- Removed redundant `?status=PUBLISHED` query parameter (backend always returns PUBLISHED)

```typescript
// Before
const res = await fetch(`${BASE}/projects?status=PUBLISHED&size=50`, {
    next: { revalidate: 60 },
});

// After
const res = await fetch(`${BASE}/projects?size=50`, {
    next: { revalidate: 10 },
    cache: 'no-store',
});
```

### Fix 2: Enhanced Image URL Handling
**File**: `FrontEnd/lib/api/projects.ts`

**Changes**:
- More robust image URL construction logic
- Better handling of different URL formats
- Clearer code with comments

```typescript
function mapListItem(p: ProjectListResponse): ProjectData {
    let imageUrl = '/images/placeholder.jpg';
    
    if (p.imageUrl) {
        if (p.imageUrl.startsWith('http')) {
            imageUrl = p.imageUrl;
        } else if (p.imageUrl.startsWith('/media')) {
            const backendBase = BASE.replace('/api', '');
            imageUrl = `${backendBase}${p.imageUrl}`;
        } else if (p.imageUrl.startsWith('/')) {
            imageUrl = p.imageUrl;
        } else {
            imageUrl = `/${p.imageUrl}`;
        }
    }
    
    return { ...projectData, image: imageUrl };
}
```

## How to Fix Your Current Issue

### Step 1: Publish the Project
1. Go to the admin panel: `http://localhost:3000/admin/projects`
2. Find your project (currently showing as "Archived")
3. Click the **eye icon** (👁️) to change status to **PUBLISHED**
4. The project will now appear on the public landing page

### Step 2: Verify Image URL
1. Check that the image URL in the database is correct
2. If using backend media storage, ensure the file exists at `/media/...`
3. If using Next.js public folder, ensure the file exists at `public/images/...`

### Step 3: Clear Cache (if needed)
If the project still doesn't appear after publishing:

**Option A: Restart Next.js Dev Server**
```bash
cd FrontEnd
# Stop the server (Ctrl+C)
npm run dev
```

**Option B: Hard Refresh Browser**
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

**Option C: Clear Next.js Cache**
```bash
cd FrontEnd
rm -rf .next
npm run dev
```

## Project Status Workflow

```
┌─────────┐
│  DRAFT  │ ← New projects start here (not visible on public site)
└────┬────┘
     │
     │ Admin clicks "Publish" (eye icon)
     ↓
┌───────────┐
│ PUBLISHED │ ← Visible on public landing page
└─────┬─────┘
      │
      │ Admin clicks "Archive" (eye-off icon)
      ↓
┌──────────┐
│ ARCHIVED │ ← Hidden from public site (your current status)
└──────────┘
```

## Testing Checklist

After applying the fix, verify:

- [ ] Project status is set to `PUBLISHED` in admin panel
- [ ] Project appears on homepage: `http://localhost:3000`
- [ ] Project image displays correctly
- [ ] Clicking project opens detail page
- [ ] New projects appear within 10 seconds of publishing

## Backend API Endpoints

### Public Endpoint (No Auth Required)
```
GET /api/projects
```
- Returns only PUBLISHED projects
- Sorted by creation date (newest first)
- Paginated (default 12 per page)

### Admin Endpoint (Auth Required)
```
GET /api/admin/projects?status=PUBLISHED
PATCH /api/admin/projects/{id}/status?status=PUBLISHED
```
- Returns projects filtered by status
- Can change project status

## Common Issues & Solutions

### Issue: "Project still not showing after publishing"
**Solution**: 
1. Check browser console for errors
2. Verify backend is running: `http://localhost:8080/api/projects`
3. Check project status in database
4. Clear Next.js cache

### Issue: "Image shows placeholder instead of actual image"
**Solution**:
1. Verify image URL in database
2. Check if file exists at the specified path
3. Ensure backend media endpoint is accessible
4. Check browser console for 404 errors

### Issue: "Changes take too long to appear"
**Solution**:
1. The fix reduced cache time to 10 seconds
2. Use hard refresh in browser
3. Restart Next.js dev server

## Files Modified

1. `FrontEnd/lib/api/projects.ts`
   - Improved caching strategy
   - Enhanced image URL handling
   - Better error handling

## Additional Recommendations

### 1. Add Status Indicator in Admin Panel
Consider adding a visual indicator showing which projects are visible on the public site.

### 2. Implement Auto-Publish Option
Add a checkbox in the "Add Project" form to automatically publish upon creation.

### 3. Add Image Preview
Show image preview in the admin panel before saving.

### 4. Implement Image Validation
Validate image URLs and file existence before saving.

## Summary

The main issue was that your project had status `Archived` instead of `PUBLISHED`. Only published projects appear on the public landing page. The fixes applied improve caching and image URL handling, but the immediate solution is to **change the project status to PUBLISHED** using the eye icon in the admin panel.
