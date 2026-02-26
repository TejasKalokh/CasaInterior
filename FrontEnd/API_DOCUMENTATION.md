# Casa Interior - API Documentation for Admin Panel

This document explains the API endpoints available for managing projects through your admin panel.

## Base URL
```
/api/projects
```

## Authentication
**TODO**: Add authentication middleware to protect these endpoints. Only authenticated admin users should be able to create, update, or delete projects.

---

## Endpoints

### 1. Get All Projects
**GET** `/api/projects`

Returns a list of all projects.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "01",
      "slug": "meridian-residence",
      "title": "The Meridian Residence",
      "category": "Luxury Residential",
      "location": "Mumbai, India",
      "year": "2024",
      "description": "...",
      "image": "/images/...",
      "client": "Private Client",
      "duration": "8 months",
      "area": "4,500 sq ft",
      "budget": "₹2.5 Cr",
      "challenge": "...",
      "solution": "...",
      "planning": "...",
      "beforeImages": ["..."],
      "afterImages": ["..."],
      "videoUrl": "/Preview.mp4",
      "features": ["..."],
      "materials": ["..."],
      "team": [
        { "role": "Lead Designer", "name": "..." }
      ]
    }
  ],
  "count": 5
}
```

---

### 2. Get Single Project
**GET** `/api/projects/[slug]`

Returns a single project by its slug.

**Parameters:**
- `slug` (string) - The project slug (e.g., "meridian-residence")

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "01",
    "slug": "meridian-residence",
    "title": "The Meridian Residence",
    ...
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Project not found"
}
```

---

### 3. Create New Project
**POST** `/api/projects`

Creates a new project.

**Request Body:**
```json
{
  "slug": "new-project-slug",
  "title": "New Project Title",
  "category": "Luxury Residential",
  "location": "City, Country",
  "year": "2024",
  "description": "Project description...",
  "image": "/images/main-image.jpg",
  "client": "Client Name",
  "duration": "6 months",
  "area": "3,000 sq ft",
  "budget": "₹1.5 Cr",
  "challenge": "The challenge description...",
  "solution": "The solution description...",
  "planning": "Planning timeline...",
  "beforeImages": ["/images/before1.jpg", "/images/before2.jpg"],
  "afterImages": ["/images/after1.jpg", "/images/after2.jpg"],
  "videoUrl": "/videos/project.mp4",
  "features": [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  "materials": [
    "Material 1",
    "Material 2"
  ],
  "team": [
    { "role": "Lead Designer", "name": "Designer Name" },
    { "role": "Project Manager", "name": "Manager Name" }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": { ... }
}
```

---

### 4. Update Project
**PUT** `/api/projects/[slug]`

Updates an existing project. You can send partial data - only the fields you want to update.

**Parameters:**
- `slug` (string) - The project slug to update

**Request Body (partial update example):**
```json
{
  "title": "Updated Project Title",
  "budget": "₹2.0 Cr",
  "features": [
    "Updated feature 1",
    "Updated feature 2"
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Project updated successfully",
  "data": { ... }
}
```

---

### 5. Delete Project
**DELETE** `/api/projects/[slug]`

Deletes a project.

**Parameters:**
- `slug` (string) - The project slug to delete

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

## Data Structure

### ProjectData Interface
```typescript
interface ProjectData {
  id: string;                    // Unique identifier (e.g., "01", "02")
  slug: string;                  // URL-friendly slug (e.g., "meridian-residence")
  title: string;                 // Project title
  category: string;              // Category (e.g., "Luxury Residential")
  location: string;              // Location (e.g., "Mumbai, India")
  year: string;                  // Completion year
  description: string;           // Short description
  image: string;                 // Main project image URL
  
  // Detail page data
  client: string;                // Client name
  duration: string;              // Project duration (e.g., "8 months")
  area: string;                  // Project area (e.g., "4,500 sq ft")
  budget: string;                // Project budget (e.g., "₹2.5 Cr")
  
  challenge: string;             // Challenge description
  solution: string;              // Solution description
  planning: string;              // Planning timeline description
  
  beforeImages: string[];        // Array of before image URLs
  afterImages: string[];         // Array of after image URLs
  videoUrl?: string;             // Optional transformation video URL
  
  features: string[];            // Array of key features
  materials: string[];           // Array of materials used
  team: {                        // Array of team members
    role: string;
    name: string;
  }[];
}
```

---

## Implementation Steps for Admin Panel

### 1. Database Setup
First, set up your database (MongoDB, PostgreSQL, etc.) with a `projects` table/collection matching the `ProjectData` interface.

### 2. Update API Routes
Replace the TODO comments in the API routes with actual database queries:

**Example with Prisma (PostgreSQL):**
```typescript
// app/api/projects/route.ts
import { prisma } from '@/lib/prisma';

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json({ success: true, data: projects });
}

export async function POST(request: Request) {
  const body = await request.json();
  const project = await prisma.project.create({ data: body });
  return NextResponse.json({ success: true, data: project });
}
```

### 3. Add Authentication
Protect the POST, PUT, and DELETE endpoints with authentication middleware:

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // ... rest of the code
}
```

### 4. Admin Panel Integration
Your admin panel can now use these endpoints:

**Example Admin Panel Functions:**
```typescript
// Create new project
async function createProject(formData) {
  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return response.json();
}

// Update project
async function updateProject(slug, updates) {
  const response = await fetch(`/api/projects/${slug}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  return response.json();
}

// Delete project
async function deleteProject(slug) {
  const response = await fetch(`/api/projects/${slug}`, {
    method: 'DELETE'
  });
  return response.json();
}
```

---

## Frontend Behavior

The frontend is designed to work seamlessly with the API:

1. **Static Generation**: Projects are fetched at build time for optimal performance
2. **Revalidation**: Data is revalidated every 60 seconds (configurable)
3. **Fallback**: If the API fails, it falls back to static data from `projectsData.ts`
4. **No UI Changes**: The current UI remains exactly the same

---

## File Upload Handling

For images and videos, you'll need to implement file upload functionality:

### Option 1: Direct Upload to Cloud Storage
```typescript
// Example with AWS S3
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  // Upload to S3
  const s3Client = new S3Client({ region: 'us-east-1' });
  const command = new PutObjectCommand({
    Bucket: 'your-bucket',
    Key: `projects/${file.name}`,
    Body: Buffer.from(await file.arrayBuffer())
  });
  
  await s3Client.send(command);
  const imageUrl = `https://your-bucket.s3.amazonaws.com/projects/${file.name}`;
  
  return NextResponse.json({ success: true, url: imageUrl });
}
```

### Option 2: Upload to `/public` folder
```typescript
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const filePath = path.join(process.cwd(), 'public/images', file.name);
  await writeFile(filePath, buffer);
  
  return NextResponse.json({ 
    success: true, 
    url: `/images/${file.name}` 
  });
}
```

---

## Testing the API

You can test the API using curl or Postman:

```bash
# Get all projects
curl http://localhost:3000/api/projects

# Get single project
curl http://localhost:3000/api/projects/meridian-residence

# Create project (requires authentication)
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"New Project","slug":"new-project",...}'

# Update project (requires authentication)
curl -X PUT http://localhost:3000/api/projects/meridian-residence \
  -H "Content-Type: application/json" \
  -d '{"budget":"₹3.0 Cr"}'

# Delete project (requires authentication)
curl -X DELETE http://localhost:3000/api/projects/meridian-residence
```

---

## Notes

- The current implementation uses static data as a fallback
- All API routes are in `/app/api/projects/`
- Helper functions are in `/lib/api/projects.ts`
- The frontend automatically uses the API without any UI changes
- Remember to add proper validation and error handling in production
- Consider adding pagination for large numbers of projects
- Add rate limiting to prevent abuse
- Implement proper logging for debugging

---

## Next Steps

1. Choose and set up your database
2. Implement authentication (NextAuth.js recommended)
3. Replace TODO comments with actual database queries
4. Add file upload functionality
5. Build your admin panel UI
6. Test thoroughly before deploying
7. Add monitoring and error tracking (Sentry, LogRocket, etc.)
