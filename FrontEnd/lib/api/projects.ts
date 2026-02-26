/**
 * Public-facing project fetchers — no auth required.
 * Uses native fetch (Next.js ISR caching) so SSR pages can call them.
 *
 * Backend returns Spring Page<ProjectListResponse> wrapped in ApiResponse.
 * Shape: { success, data: { content: [], totalElements, ... } }
 */

import type { ProjectListResponse, ProjectResponse, ApiResponse, ApiPage } from '@/lib/types';

const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// ─── Map backend → legacy ProjectData shape used by the UI ────────────────────

export interface ProjectData {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: string;
    location: string;
    year: string;
    image: string;
    status?: string;
}

function mapListItem(p: ProjectListResponse): ProjectData {
    // Construct the correct image URL
    let imageUrl = '/images/placeholder.jpg';
    
    if (p.imageUrl) {
        if (p.imageUrl.startsWith('http')) {
            // Already a full URL
            imageUrl = p.imageUrl;
        } else if (p.imageUrl.startsWith('/media')) {
            // Backend media file - construct full URL
            const backendBase = BASE.replace('/api', '');
            imageUrl = `${backendBase}${p.imageUrl}`;
            console.log('[mapListItem] Constructed media URL:', imageUrl, 'from', p.imageUrl);
        } else if (p.imageUrl.startsWith('/')) {
            // Absolute path - likely Next.js public folder
            imageUrl = p.imageUrl;
        } else {
            // Relative path - prepend slash
            imageUrl = `/${p.imageUrl}`;
        }
    }
    
    console.log('[mapListItem] Final image URL for project', p.id, ':', imageUrl);
    
    return {
        id: p.id.toString(),
        slug: p.id.toString(),          // public detail page uses /projects/[id]
        title: p.title,
        description: p.description,
        category: p.category,
        location: p.location,
        year: p.year,
        image: imageUrl,
        status: p.status,
    };
}

/**
 * Fetch all PUBLISHED projects for the public homepage.
 */
export async function fetchProjects(): Promise<ProjectData[]> {
    try {
        const res = await fetch(`${BASE}/projects?size=50`, {
            next: { revalidate: 10 }, // Reduced from 60 to 10 seconds for faster updates
            cache: 'no-store', // Disable caching to always fetch fresh data
        });
        if (!res.ok) throw new Error('Failed');
        const json: ApiResponse<ApiPage<ProjectListResponse>> = await res.json();
        return (json.data?.content ?? []).map(mapListItem);
    } catch (err) {
        console.error('[fetchProjects]', err);
        return [];
    }
}

/**
 * Fetch a single project by its numeric ID for the detail page.
 */
export async function fetchProjectById(id: string): Promise<ProjectResponse | null> {
    try {
        const res = await fetch(`${BASE}/projects/${id}`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) return null;
        const json: ApiResponse<ProjectResponse> = await res.json();
        return json.data ?? null;
    } catch (err) {
        console.error('[fetchProjectById]', err);
        return null;
    }
}

/**
 * Fetch a single project by its numeric ID for the detail page.
 * Returns the full ProjectResponse (includes client, duration, teamMembers etc).
 * The slug param is the numeric ID (we route by ID, never by title slug).
 */
export async function fetchProjectBySlug(slug: string): Promise<ProjectResponse | null> {
    return fetchProjectById(slug);
}
