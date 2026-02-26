# Casa Interior - Admin Dashboard Setup Guide

## Overview

A premium, frontend-only admin dashboard for managing interior design projects and client inquiries. Built with luxury aesthetics inspired by Apple, Linear, and Notion.

## Features

✅ **Dashboard Home** - Stats overview and quick actions
✅ **Add Project Wizard** - 4-step form with file uploads
✅ **Inquiries Table** - Search, filter, and manage client messages
✅ **Responsive Design** - Works on all devices
✅ **Smooth Animations** - Framer Motion throughout
✅ **Mock Data** - No backend required

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- TailwindCSS
- Framer Motion
- Lucide Icons

## File Structure

```
app/
├── admin/
│   ├── layout.tsx              # Admin layout with sidebar
│   ├── page.tsx                # Dashboard home
│   ├── projects/
│   │   └── new/
│   │       └── page.tsx        # Add project wizard
│   ├── inquiries/
│   │   └── page.tsx            # Inquiries table
│   └── settings/
│       └── page.tsx            # Settings placeholder

components/
├── admin/
│   ├── AdminSidebar.tsx        # Left navigation
│   ├── AdminTopbar.tsx         # Top bar with user avatar
│   ├── InquiryDrawer.tsx       # Inquiry detail drawer
│   └── wizard/
│       ├── BasicInfoStep.tsx   # Step 1: Project basics
│       ├── MediaStep.tsx       # Step 2: File uploads
│       ├── StoryStep.tsx       # Step 3: Challenge & solution
│       ├── DetailsStep.tsx     # Step 4: Features & team
│       └── SuccessModal.tsx    # Success animation

lib/
└── adminData.ts                # Mock data and types
```

## Getting Started

### 1. Access the Admin Panel

Navigate to:
```
http://localhost:3000/admin
```

### 2. Dashboard Features

**Dashboard Home** (`/admin`)
- View project statistics
- Quick action cards
- Animated stats grid

**Add Project** (`/admin/projects/new`)
- 4-step wizard form
- Progress indicator
- File upload UI (mock)
- Tag inputs for features/materials
- Team member management
- Save draft functionality
- Success animation on publish

**Inquiries** (`/admin/inquiries`)
- Searchable table
- Filter by status (new/read/archived)
- Click row to open detail drawer
- Mark as read/archive/delete actions
- 6 mock inquiries included

**Settings** (`/admin/settings`)
- Placeholder page

## Design System

### Colors
- Background: `#FAFAF9` (soft off-white)
- Cards: `white` with subtle shadows
- Accent: `#C9A96E` (gold)
- Text: `neutral-900` (charcoal)

### Typography
- Headings: Cormorant Garamond (serif)
- UI Text: Inter (sans-serif)

### Components
- Rounded corners: `rounded-xl` / `rounded-2xl`
- Shadows: Soft, subtle
- Borders: `border-neutral-200/50`
- Hover states: Scale + color transitions

## Mock Data

### Projects
All project data is stored in React state. On "Publish", data is logged to console and form resets.

### Inquiries
6 mock inquiries in `lib/adminData.ts`:
- Priya Sharma (new)
- Rahul Mehta (new)
- Anita Desai (read)
- Vikram Singh (read)
- Meera Iyer (archived)
- Arjun Patel (archived)

## Key Features

### Add Project Wizard

**Step 1: Basic Info**
- Project title, description
- Client, location
- Duration, year, area, budget

**Step 2: Media**
- Main image upload (drag & drop UI)
- Video upload (drag & drop UI)
- Preview thumbnails
- Remove uploaded files

**Step 3: Story**
- Challenge textarea
- Solution textarea

**Step 4: Details**
- Key features (tag input)
- Materials (tag input)
- Team members (name + role)

**Actions:**
- Back/Next navigation
- Save Draft (localStorage)
- Publish (console log + reset)

### Inquiries Table

**Features:**
- Search by name/email/message
- Filter by status
- Sort by date
- Click row to open drawer

**Drawer Actions:**
- Mark as Read
- Archive
- Delete (with confirmation)

## Animations

All animations use Framer Motion:
- Page transitions
- Card entrance (stagger)
- Button hover (scale)
- Input focus (ring)
- Modal/drawer (slide)
- Success animation

## Customization

### Change Colors

Edit `tailwind.config.ts` or inline styles:
```typescript
// Gold accent
bg-[#C9A96E]
hover:bg-[#A8844A]

// Replace with your brand color
bg-[#YOUR_COLOR]
```

### Add More Steps

In `app/admin/projects/new/page.tsx`:
```typescript
const steps = [
  // ... existing steps
  { id: 5, name: "New Step", description: "Description" }
];
```

Create new step component in `components/admin/wizard/`.

### Modify Mock Data

Edit `lib/adminData.ts`:
```typescript
export const mockInquiries: Inquiry[] = [
  // Add/edit inquiries
];
```

## Production Considerations

This is a **frontend-only prototype**. For production:

1. **Backend Integration**
   - Replace mock data with API calls
   - Implement actual file uploads
   - Add authentication

2. **Database**
   - Store projects in database
   - Store inquiries in database
   - Implement real CRUD operations

3. **Authentication**
   - Add login page
   - Protect admin routes
   - Implement role-based access

4. **File Storage**
   - Use cloud storage (S3, Cloudinary)
   - Implement actual upload logic
   - Generate thumbnails

5. **Validation**
   - Add form validation (Zod)
   - Server-side validation
   - Error handling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lazy loaded components
- Optimized animations
- No layout shift
- Fast page transitions

## Troubleshooting

### Animations not working
- Ensure Framer Motion is installed
- Check browser console for errors

### Styles not applying
- Clear Next.js cache: `rm -rf .next`
- Restart dev server

### Images not uploading
- This is a mock UI only
- Files are stored in React state
- Not persisted to server

## Next Steps

1. **Connect to Backend**
   - Use the API routes created earlier
   - Replace mock data with real data

2. **Add Authentication**
   - Implement NextAuth.js
   - Protect admin routes

3. **Implement Real Uploads**
   - Use UploadThing or similar
   - Store files in cloud storage

4. **Add More Features**
   - Analytics dashboard
   - Project editing
   - Bulk actions
   - Export data

## Support

For questions or issues, refer to:
- Next.js docs: https://nextjs.org/docs
- Framer Motion docs: https://www.framer.com/motion/
- TailwindCSS docs: https://tailwindcss.com/docs

---

**Built with care for Casa Interior** ✨
