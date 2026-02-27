import { NextResponse } from 'next/server';
import { fetchProjectById } from '@/lib/api/projects';

/**
 * GET /api/projects/[slug]
 * Proxies to the real backend and returns a single project by ID.
 */
export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const project = await fetchProjectById(slug);

        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: project,
        });
    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch project' },
            { status: 500 }
        );
    }
}
