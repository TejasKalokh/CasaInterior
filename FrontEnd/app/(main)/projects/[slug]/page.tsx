import { notFound } from "next/navigation";
import { fetchProjects, fetchProjectBySlug } from "@/lib/api/projects";
import ProjectDetailClient from "@/components/project/ProjectDetailClient";

// Force dynamic rendering - don't cache pages
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateStaticParams() {
    const projects = await fetchProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await fetchProjectBySlug(slug);
    
    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: `${project.title} — Casa Interior`,
        description: project.description,
    };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await fetchProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return <ProjectDetailClient project={project} />;
}
