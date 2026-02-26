import { NextResponse } from 'next/server';
import { projectsData } from '@/lib/projectsData';

/**
 * GET /api/projects/[slug]
 * Returns a single project by slug
 */
export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        
        // TODO: Replace with database query
        // const project = await db.projects.findUnique({ where: { slug } });
        const project = projectsData.find(p => p.slug === slug);
        
        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json({
            success: true,
            data: project
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch project' },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/projects/[slug]
 * Updates a project by slug
 * 
 * Expected body: Partial project data to update
 */
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const body = await request.json();
        
        // TODO: Validate the data
        // TODO: Update in database
        // const updatedProject = await db.projects.update({
        //     where: { slug },
        //     data: body
        // });
        
        return NextResponse.json({
            success: true,
            message: 'Project updated successfully',
            data: body
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to update project' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/projects/[slug]
 * Deletes a project by slug
 */
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        
        // TODO: Delete from database
        // await db.projects.delete({ where: { slug } });
        
        return NextResponse.json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to delete project' },
            { status: 500 }
        );
    }
}
