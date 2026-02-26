import { NextResponse } from 'next/server';
import { projectsData } from '@/lib/projectsData';

/**
 * GET /api/projects
 * Returns all projects
 * 
 * In production, this would fetch from your database
 * For now, it returns the static data
 */
export async function GET() {
    try {
        // TODO: Replace with database query
        // const projects = await db.projects.findMany();
        
        return NextResponse.json({
            success: true,
            data: projectsData,
            count: projectsData.length
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/projects
 * Creates a new project
 * 
 * Expected body:
 * {
 *   title: string,
 *   slug: string,
 *   category: string,
 *   location: string,
 *   year: string,
 *   description: string,
 *   image: string,
 *   client: string,
 *   duration: string,
 *   area: string,
 *   budget: string,
 *   challenge: string,
 *   solution: string,
 *   planning: string,
 *   beforeImages: string[],
 *   afterImages: string[],
 *   videoUrl?: string,
 *   features: string[],
 *   materials: string[],
 *   team: { role: string, name: string }[]
 * }
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // TODO: Validate the data
        // TODO: Insert into database
        // const newProject = await db.projects.create({ data: body });
        
        return NextResponse.json({
            success: true,
            message: 'Project created successfully',
            data: body
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to create project' },
            { status: 500 }
        );
    }
}
