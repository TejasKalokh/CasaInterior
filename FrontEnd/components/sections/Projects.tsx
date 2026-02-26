"use client";

/**
 * Projects Section — Editorial dark layout.
 * Full-bleed image cards with bottom-left text overlay,
 * horizontal GSAP scroll, and a "More" end panel.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectData } from "@/lib/api/projects";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsSectionProps {
    initialProjects?: ProjectData[];
}

/* Card widths in vw — alternating for editorial rhythm */
const WIDTHS = [40, 48, 40, 48, 40, 48, 40, 48, 40, 48];
const END_PANEL_W = 28; // vw for the "More" CTA panel

export default function Projects({ initialProjects }: ProjectsSectionProps) {
    const [projectsData, setProjectsData] = useState<ProjectData[]>(initialProjects || []);
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    /* ── Fetch projects if not server-provided ──────────── */
    useEffect(() => {
        if (!initialProjects || initialProjects.length === 0) {
            fetch("/api/projects")
                .then((r) => r.json())
                .then((res) => { if (res.success) setProjectsData(res.data); })
                .catch((e) => console.error("Failed to fetch projects:", e));
        }
    }, [initialProjects]);

    /* ── GSAP horizontal scroll ─────────────────────────── */
    useEffect(() => {
        if (!sectionRef.current || !trackRef.current || projectsData.length === 0) return;
        trackRef.current.style.willChange = "transform";

        const ctx = gsap.context(() => {
            const track = trackRef.current!;
            const totalScrollWidth = track.scrollWidth - window.innerWidth;

            const tween = gsap.to(track, {
                x: () => -totalScrollWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${totalScrollWidth + window.innerWidth * 0.5}`,
                    pin: true,
                    scrub: 1.2,
                    anticipatePin: 1,
                },
            });

            /* Per-card parallax */
            track.querySelectorAll<HTMLElement>(".proj-bg").forEach((img) => {
                gsap.to(img, {
                    x: "12%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: img.closest(".proj-card"),
                        start: "left right",
                        end: "right left",
                        containerAnimation: tween,
                        scrub: true,
                    },
                });
            });
        }, sectionRef);

        return () => {
            ctx.revert();
            if (trackRef.current) trackRef.current.style.willChange = "auto";
        };
    }, [projectsData]);

    /* total track width = sum of card widths + end panel + gaps */
    const totalW =
        projectsData.reduce((s, _, i) => s + WIDTHS[i % WIDTHS.length], 0)
        + END_PANEL_W
        + projectsData.length * 0.6; // ~0.6vw gap per card

    return (
        <section id="projects" style={{ backgroundColor: "#F7F5F0" }}>
            {/* ── Header ──────────────────────────────────── */}
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1.5rem",
                    padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,4rem) clamp(2rem,3vw,2.5rem)",
                }}
            >
                {/* Left — label + title */}
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                        <span style={{ display: "block", height: "1px", width: "2.5rem", backgroundColor: "#C9A96E" }} />
                        <span
                            style={{
                                fontFamily: "var(--font-inter), sans-serif",
                                fontSize: "0.6rem",
                                letterSpacing: "0.35em",
                                textTransform: "uppercase",
                                color: "#C9A96E",
                            }}
                        >
                            Portfolio
                        </span>
                    </div>
                    <h2
                        style={{
                            fontFamily: "var(--font-cormorant), Georgia, serif",
                            fontWeight: 300,
                            fontSize: "clamp(2.2rem,5vw,4.5rem)",
                            lineHeight: 1.05,
                            color: "#1C1C1E",
                            letterSpacing: "-0.01em",
                        }}
                    >
                        Featured{" "}
                        <em style={{ fontStyle: "italic", color: "#C9A96E" }}>Projects</em>
                    </h2>
                </div>

                {/* Right — description + "All Projects" link */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: "clamp(2rem,5vw,5rem)", flexWrap: "wrap" }}>
                    <p
                        style={{
                            fontFamily: "var(--font-inter), sans-serif",
                            fontSize: "clamp(0.78rem,1vw,0.92rem)",
                            color: "rgba(247,245,240,0.4)",
                            lineHeight: 1.75,
                            maxWidth: "22rem",
                        }}
                    >
                        A curated selection of our most celebrated commissions across residential, hospitality, and commercial categories.
                    </p>
                    <Link
                        href="/projects"
                        style={{
                            fontFamily: "var(--font-inter), sans-serif",
                            fontSize: "0.6rem",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            color: "#1C1C1E",
                            textDecoration: "none",
                            whiteSpace: "nowrap",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            paddingBottom: "2px",
                            borderBottom: "1px solid rgba(201,169,110,0.3)",
                        }}
                    >
                        All Projects <span style={{ fontSize: "0.75rem" }}>→</span>
                    </Link>
                </div>
            </div>

            {/* ── Horizontal Scroll Track ─────────────────── */}
            <div ref={sectionRef} style={{ overflow: "hidden" }}>
                <div>
                    <div
                        ref={trackRef}
                        style={{
                            display: "flex",
                            gap: "0.6vw",
                            width: `${totalW}vw`,
                        }}
                    >
                        {/* ── Project Cards ──────────────────── */}
                        {projectsData.map((p, i) => {
                            const w = WIDTHS[i % WIDTHS.length];
                            return (
                                <Link
                                    key={p.id}
                                    href={`/projects/${p.slug}`}
                                    className="proj-card"
                                    style={{
                                        position: "relative",
                                        flexShrink: 0,
                                        overflow: "hidden",
                                        width: `${w}vw`,
                                        height: "100vh",
                                        display: "block",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    {/* Parallax background */}
                                    <div
                                        className="proj-bg"
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            left: "-10%",
                                            width: "120%",
                                            backgroundImage: p.image ? `url('${p.image}')` : "none",
                                            backgroundColor: p.image ? "transparent" : "#1a1a1a",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            willChange: "transform",
                                            transition: "transform 0.6s ease",
                                        }}
                                    />

                                    {/* Gradient overlay */}
                                    <div
                                        className="proj-overlay"
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background:
                                                "linear-gradient(to top, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.25) 40%, transparent 100%)",
                                            zIndex: 1,
                                            transition: "background 0.4s ease",
                                        }}
                                    />

                                    {/* Bottom-left text */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            zIndex: 2,
                                            padding: "clamp(1.5rem,3vw,2.5rem)",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontFamily: "var(--font-inter), sans-serif",
                                                fontSize: "0.55rem",
                                                letterSpacing: "0.3em",
                                                textTransform: "uppercase",
                                                color: "#C9A96E",
                                                marginBottom: "0.5rem",
                                                display: "block",
                                            }}
                                        >
                                            {p.category}
                                        </span>
                                        <h3
                                            style={{
                                                fontFamily: "var(--font-cormorant), Georgia, serif",
                                                fontWeight: 400,
                                                fontSize: "clamp(1.4rem,2.5vw,2.5rem)",
                                                lineHeight: 1.1,
                                                color: "#F7F5F0",
                                            }}
                                        >
                                            {p.title}
                                        </h3>
                                    </div>

                                    {/* Small icon bottom-left corner */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            bottom: "clamp(1.5rem,3vw,2.5rem)",
                                            right: "clamp(1.5rem,3vw,2.5rem)",
                                            zIndex: 2,
                                            width: "28px",
                                            height: "28px",
                                            border: "1px solid rgba(201,169,110,0.4)",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#C9A96E",
                                            fontSize: "0.75rem",
                                            transition: "all 0.3s ease",
                                        }}
                                        className="proj-arrow"
                                    >
                                        ↗
                                    </div>
                                </Link>
                            );
                        })}

                        {/* ── "More" End Panel ──────────────── */}
                        <div
                            style={{
                                flexShrink: 0,
                                width: `${END_PANEL_W}vw`,
                                height: "100vh",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "1.5rem",
                                backgroundColor: "#0A0A0A",
                            }}
                        >
                            <p
                                style={{
                                    fontFamily: "var(--font-cormorant), Georgia, serif",
                                    fontWeight: 300,
                                    fontSize: "clamp(1.5rem,2.5vw,2.2rem)",
                                    color: "#F7F5F0",
                                }}
                            >
                                {projectsData.length > 2
                                    ? `${projectsData.length - 2}+ More`
                                    : "More"}
                            </p>
                            <Link
                                href="/projects"
                                style={{
                                    fontFamily: "var(--font-inter), sans-serif",
                                    fontSize: "0.6rem",
                                    letterSpacing: "0.25em",
                                    textTransform: "uppercase",
                                    color: "#C9A96E",
                                    textDecoration: "none",
                                    border: "1px solid rgba(201,169,110,0.5)",
                                    padding: "0.85rem 2rem",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.6rem",
                                    transition: "all 0.3s ease",
                                }}
                                className="view-all-btn"
                            >
                                View All <span style={{ fontSize: "0.75rem" }}>→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Hover styles ────────────────────────────── */}
            <style>{`
                .proj-card:hover .proj-bg { transform: scale(1.05) !important; }
                .proj-card:hover .proj-overlay {
                    background: linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.35) 40%, transparent 100%) !important;
                }
                .proj-card:hover .proj-arrow {
                    background: rgba(201,169,110,0.15);
                    border-color: #C9A96E;
                    transform: rotate(45deg);
                }
                .view-all-btn:hover {
                    background: rgba(201,169,110,0.1) !important;
                    border-color: #C9A96E !important;
                }
                @media(max-width:768px) {
                    .proj-card { width: 85vw !important; height: 60vh !important; }
                }
            `}</style>
        </section>
    );
}
