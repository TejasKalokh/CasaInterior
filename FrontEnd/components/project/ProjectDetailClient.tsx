"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ProjectResponse } from "@/lib/types";
import { fadeUp, fadeIn, staggerContainer, staggerItem, viewportSettings } from "@/lib/animations";
import { Container, Section } from "@/components/ui/Layout";

interface ProjectDetailClientProps {
    project: ProjectResponse;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoSectionRef = useRef<HTMLDivElement>(null);
    const isVideoInView = useInView(videoSectionRef, { once: true, margin: "-100px" });

    // Auto-play video when it comes into view
    if (isVideoInView && videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {
            // Autoplay might be blocked by browser, that's okay
        });
    }

    return (
        <div style={{ backgroundColor: "#F7F5F0", minHeight: "100vh", paddingTop: "5rem" }}>
            {/* Hero Section */}
            <Section style={{ paddingTop: "clamp(3rem, 6vw, 5rem)", paddingBottom: "clamp(2rem, 4vw, 3rem)" }}>
                <Container>
                    <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                        {/* Breadcrumb */}
                        <motion.div variants={staggerItem} style={{ marginBottom: "2rem" }}>
                            <Link href="/#projects" style={{
                                fontFamily: "var(--font-inter), sans-serif",
                                fontSize: "0.75rem",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                color: "#6B6560",
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.5rem"
                            }}>
                                ← Back to Projects
                            </Link>
                        </motion.div>

                        {/* Title & Meta */}
                        <div style={{ display: "grid", gap: "3rem", marginBottom: "3rem" }} className="project-header-grid">
                            <div>
                                <motion.div variants={staggerItem} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                                    <span style={{ display: "block", height: "1px", width: "3rem", backgroundColor: "#C9A96E" }} />
                                    <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E" }}>{project.category}</span>
                                </motion.div>
                                <motion.h1 variants={staggerItem} style={{
                                    fontFamily: "var(--font-cormorant), Georgia, serif",
                                    fontWeight: 400,
                                    fontSize: "clamp(2.5rem, 5vw, 5rem)",
                                    lineHeight: 1.05,
                                    letterSpacing: "-0.02em",
                                    color: "#1C1C1E",
                                    marginBottom: "1.5rem"
                                }}>
                                    {project.title}
                                </motion.h1>
                                <motion.p variants={staggerItem} style={{
                                    fontFamily: "var(--font-inter), sans-serif",
                                    fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                                    lineHeight: "1.7",
                                    color: "#6B6560",
                                    maxWidth: "42rem"
                                }}>
                                    {project.description}
                                </motion.p>
                            </div>

                            {/* Project Info Grid */}
                            <motion.div variants={staggerItem} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem 3rem", alignSelf: "start", paddingTop: "3.5rem" }} className="info-grid">
                                {[
                                    { label: "Client", value: project.client },
                                    { label: "Location", value: project.location },
                                    { label: "Duration", value: project.duration },
                                    { label: "Year", value: project.year },
                                    { label: "Area", value: project.area },
                                    { label: "Budget", value: project.budget },
                                ].map((item) => (
                                    <div key={item.label}>
                                        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "0.5rem" }}>{item.label}</p>
                                        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.95rem", color: "#1C1C1E", fontWeight: 500 }}>{item.value}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </Container>
            </Section>

            {/* Hero Image */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                style={{ width: "100%", overflow: "hidden", marginBottom: "clamp(4rem, 8vw, 6rem)" }}
            >
                <img
                    src={project.imageUrl ?? ""}
                    alt={project.title ?? "Project image"}
                    style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        objectFit: "contain",
                    }}
                />
            </motion.div>

            {/* Challenge & Solution */}
            <Section style={{ backgroundColor: "#EDE8E0" }}>
                <Container>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem" }} className="content-grid">
                        <motion.div initial="hidden" whileInView="visible" viewport={viewportSettings} variants={staggerContainer}>
                            <motion.h2 variants={staggerItem} style={{
                                fontFamily: "var(--font-cormorant), Georgia, serif",
                                fontWeight: 400,
                                fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)",
                                lineHeight: 1.1,
                                color: "#1C1C1E",
                                marginBottom: "1.5rem"
                            }}>
                                The Challenge
                            </motion.h2>
                            <motion.p variants={staggerItem} style={{
                                fontFamily: "var(--font-inter), sans-serif",
                                fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                                lineHeight: "1.8",
                                color: "#6B6560",
                                maxWidth: "50rem"
                            }}>
                                {project.challenge}
                            </motion.p>
                        </motion.div>

                        <motion.div initial="hidden" whileInView="visible" viewport={viewportSettings} variants={staggerContainer}>
                            <motion.h2 variants={staggerItem} style={{
                                fontFamily: "var(--font-cormorant), Georgia, serif",
                                fontWeight: 400,
                                fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)",
                                lineHeight: 1.1,
                                color: "#1C1C1E",
                                marginBottom: "1.5rem"
                            }}>
                                Our Solution
                            </motion.h2>
                            <motion.p variants={staggerItem} style={{
                                fontFamily: "var(--font-inter), sans-serif",
                                fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                                lineHeight: "1.8",
                                color: "#6B6560",
                                maxWidth: "50rem"
                            }}>
                                {project.solution}
                            </motion.p>
                        </motion.div>
                    </div>
                </Container>
            </Section>

            {/* Before & After Video */}
            {project.videoUrl && (
                <Section style={{ backgroundColor: "#1C1C1E" }} sectionRef={videoSectionRef}>
                    <Container>
                        <motion.div initial="hidden" whileInView="visible" viewport={viewportSettings} variants={staggerContainer}>
                            <motion.h2 variants={staggerItem} style={{
                                fontFamily: "var(--font-cormorant), Georgia, serif",
                                fontWeight: 400,
                                fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)",
                                lineHeight: 1.1,
                                color: "#F7F5F0",
                                marginBottom: "3rem",
                                textAlign: "center"
                            }}>
                                Transformation Journey
                            </motion.h2>
                            <motion.div variants={fadeUp} style={{ width: "100%", aspectRatio: "16/9", backgroundColor: "#000", borderRadius: "4px", overflow: "hidden" }}>
                                <video
                                    ref={videoRef}
                                    controls
                                    muted
                                    loop
                                    playsInline
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    poster={project.imageUrl ?? ""}
                                >
                                    <source src={project.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </motion.div>
                        </motion.div>
                    </Container>
                </Section>
            )}

            {/* Features & Materials */}
            {((project.features ?? []).length > 0 || (project.materials ?? []).length > 0) && (
                <Section style={{ backgroundColor: "#1C1C1E" }}>
                    <Container>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem" }} className="content-grid">
                            <motion.div initial="hidden" whileInView="visible" viewport={viewportSettings} variants={staggerContainer}>
                                <motion.h2 variants={staggerItem} style={{
                                    fontFamily: "var(--font-cormorant), Georgia, serif",
                                    fontWeight: 400,
                                    fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)",
                                    lineHeight: 1.1,
                                    color: "#F7F5F0",
                                    marginBottom: "2rem"
                                }}>
                                    Key Features
                                </motion.h2>
                                <motion.ul variants={staggerContainer} style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    {(project.features ?? []).length > 0 ? (
                                        project.features.map((feature, i) => (
                                            <motion.li key={i} variants={staggerItem} style={{
                                                fontFamily: "var(--font-inter), sans-serif",
                                                fontSize: "0.95rem",
                                                lineHeight: "1.7",
                                                color: "rgba(247,245,240,0.7)",
                                                paddingLeft: "1.5rem",
                                                position: "relative"
                                            }}>
                                                <span style={{ position: "absolute", left: 0, color: "#C9A96E" }}>✦</span>
                                                {feature}
                                            </motion.li>
                                        ))
                                    ) : (
                                        <motion.li variants={staggerItem} style={{
                                            fontFamily: "var(--font-inter), sans-serif",
                                            fontSize: "0.95rem",
                                            lineHeight: "1.7",
                                            color: "rgba(247,245,240,0.5)",
                                            fontStyle: "italic"
                                        }}>
                                            No features listed for this project.
                                        </motion.li>
                                    )}
                                </motion.ul>
                            </motion.div>

                            <motion.div initial="hidden" whileInView="visible" viewport={viewportSettings} variants={staggerContainer}>
                                <motion.h2 variants={staggerItem} style={{
                                    fontFamily: "var(--font-cormorant), Georgia, serif",
                                    fontWeight: 400,
                                    fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)",
                                    lineHeight: 1.1,
                                    color: "#F7F5F0",
                                    marginBottom: "2rem"
                                }}>
                                    Materials Used
                                </motion.h2>
                                <motion.ul variants={staggerContainer} style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    {(project.materials ?? []).length > 0 ? (
                                        project.materials.map((material, i) => (
                                            <motion.li key={i} variants={staggerItem} style={{
                                                fontFamily: "var(--font-inter), sans-serif",
                                                fontSize: "0.95rem",
                                                lineHeight: "1.7",
                                                color: "rgba(247,245,240,0.7)",
                                                paddingLeft: "1.5rem",
                                                position: "relative"
                                            }}>
                                                <span style={{ position: "absolute", left: 0, color: "#C9A96E" }}>✦</span>
                                                {material}
                                            </motion.li>
                                        ))
                                    ) : (
                                        <motion.li variants={staggerItem} style={{
                                            fontFamily: "var(--font-inter), sans-serif",
                                            fontSize: "0.95rem",
                                            lineHeight: "1.7",
                                            color: "rgba(247,245,240,0.5)",
                                            fontStyle: "italic"
                                        }}>
                                            No materials listed for this project.
                                        </motion.li>
                                    )}
                                </motion.ul>
                            </motion.div>
                        </div>
                    </Container>
                </Section>
            )}

            {/* Team */}
            <Section>
                <Container>
                    <motion.div initial="hidden" whileInView="visible" viewport={viewportSettings} variants={staggerContainer}>
                        <motion.h2 variants={staggerItem} style={{
                            fontFamily: "var(--font-cormorant), Georgia, serif",
                            fontWeight: 400,
                            fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)",
                            lineHeight: 1.1,
                            color: "#1C1C1E",
                            marginBottom: "3rem"
                        }}>
                            Project Team
                        </motion.h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
                            {(project.teamMembers ?? []).map((member, i) => (
                                <motion.div key={i} variants={staggerItem} style={{
                                    padding: "2rem",
                                    backgroundColor: "#EDE8E0",
                                    borderRadius: "2px"
                                }}>
                                    <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "0.5rem" }}>{member.role}</p>
                                    <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.3rem", color: "#1C1C1E" }}>{member.name}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </Section>

            {/* CTA */}
            <Section style={{ backgroundColor: "#1C1C1E", textAlign: "center" }}>
                <Container>
                    <motion.div initial="hidden" whileInView="visible" viewport={viewportSettings} variants={staggerContainer}>
                        <motion.h2 variants={staggerItem} style={{
                            fontFamily: "var(--font-cormorant), Georgia, serif",
                            fontWeight: 400,
                            fontSize: "clamp(2rem, 4vw, 4.5rem)",
                            lineHeight: 1.1,
                            color: "#F7F5F0",
                            marginBottom: "2rem"
                        }}>
                            Ready to transform<br />your space?
                        </motion.h2>
                        <motion.div variants={staggerItem}>
                            <motion.a
                                href="/#contact"
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: "0.75rem",
                                    background: "linear-gradient(135deg, #C9A96E, #E2C99B, #A8844A)",
                                    color: "#1C1C1E", padding: "1rem 2rem",
                                    fontFamily: "var(--font-inter), sans-serif", fontSize: "0.75rem", fontWeight: 600,
                                    letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none",
                                    cursor: "pointer"
                                }}
                                whileHover={{ letterSpacing: "0.18em", boxShadow: "0 8px 24px rgba(201,169,110,0.35)" }}
                                transition={{ duration: 0.3 }}
                            >
                                Start Your Project
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </Container>
            </Section>

            <style>{`
                @media (min-width: 768px) {
                    .project-header-grid { grid-template-columns: 1.5fr 1fr; }
                    .content-grid { grid-template-columns: 1fr 1fr; }
                }
                @media (max-width: 639px) {
                    .info-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}
