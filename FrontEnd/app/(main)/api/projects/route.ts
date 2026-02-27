import { NextResponse } from 'next/server';
import { fetchProjects } from '@/lib/api/projects';

/**
 * GET /api/projects
 * Proxies to the real backend and returns live project data.
 * Used as a client-side fallback when SSR data isn't available.
 */
export async function GET() {
    try {
        const projects = await fetchProjects();
        return NextResponse.json({
            success: true,
            data: projects,
            count: projects.length,
        });
    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}
