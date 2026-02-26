import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import { fetchProjects } from "@/lib/api/projects";

// Dynamically import below-the-fold sections to reduce initial JS bundle
const About = dynamic(() => import("@/components/sections/About"));
const Services = dynamic(() => import("@/components/sections/Services"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Process = dynamic(() => import("@/components/sections/Process"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default async function HomePage() {
  // Fetch projects on server side for better performance
  const projects = await fetchProjects();

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects initialProjects={projects} />
      <Process />
      <Testimonials />
      <Contact />
    </>
  );
}
