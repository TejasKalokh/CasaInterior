"use client";

/**
 * Process Section — animated timeline with GSAP scroll-drawn vertical line.
 */

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { staggerContainer, staggerItem, viewportSettings } from "@/lib/animations";
import { Container, Section } from "@/components/ui/Layout";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    { number: "01", title: "Discovery", description: "We begin with depth — understanding your lifestyle, aspirations, spatial needs, and the story you want your space to tell.", duration: "Week 1–2" },
    { number: "02", title: "Concept Development", description: "Our designers develop mood boards, spatial layouts, and material directions — three distinct conceptual directions presented to you.", duration: "Week 3–5" },
    { number: "03", title: "Design Refinement", description: "One concept is chosen and refined to perfection. Every fixture, finish, and furniture piece is specified with precision.", duration: "Week 6–10" },
    { number: "04", title: "Visualization", description: "Photorealistic 3D renders and a virtual walkthrough eliminate uncertainty. You walk the space before it's built.", duration: "Week 8–12" },
    { number: "05", title: "Execution", description: "Our trusted network of master craftspeople, contractors, and suppliers bring the vision to life — with us managing every detail.", duration: "Month 4–8" },
    { number: "06", title: "Handover", description: "A meticulous final walkthrough. Flowers on the table, art on the walls. Your space, perfected.", duration: "Final Week" },
];

export default function Process() {
    const lineRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!lineRef.current || !sectionRef.current) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(lineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: "none",
                    transformOrigin: "top center",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        end: "bottom 30%",
                        scrub: 1,
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <Section id="process" style={{ backgroundColor: "#EDE8E0", overflow: "hidden" }} sectionRef={sectionRef}>
            <Container>
                {/* Header */}
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSettings}
                    style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "2rem", marginBottom: "4rem" }}>
                    <div>
                        <motion.div variants={staggerItem} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                            <span style={{ display: "block", height: "1px", width: "3rem", backgroundColor: "#C9A96E" }} />
                            <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E" }}>Our Process</span>
                        </motion.div>
                        <motion.h2 variants={staggerItem} style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "#1C1C1E" }}>
                            From vision to<br /><em style={{ fontStyle: "italic", color: "#C9A96E" }}>reality</em> — six steps.
                        </motion.h2>
                    </div>
                    <motion.p variants={staggerItem} style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", lineHeight: "1.7", color: "#6B6560", maxWidth: "22rem" }}>
                        A transparent, collaborative process designed around you — with milestones you can see and decisions you can trust.
                    </motion.p>
                </motion.div>

                {/* Timeline */}
                <div style={{ position: "relative" }}>
                    {/* Vertical line */}
                    <div style={{ position: "absolute", left: "2rem", top: 0, bottom: 0, width: "1px", backgroundColor: "#D9D2C7" }} className="timeline-line-container">
                        <div
                            ref={lineRef}
                            style={{ position: "absolute", inset: 0, backgroundColor: "#C9A96E", willChange: "transform", transform: "scaleY(0)", transformOrigin: "top" }}
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.number}
                                style={{ display: "grid", paddingBottom: i < steps.length - 1 ? "3rem" : 0, position: "relative" }}
                                className="process-step"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                                viewport={{ once: true, margin: "-60px" }}
                            >
                                {/* Number col */}
                                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }} className="step-number-col">
                                    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "1rem", height: "1rem", flexShrink: 0, marginTop: "0.5rem" }}>
                                        <span style={{ position: "absolute", width: "0.75rem", height: "0.75rem", borderRadius: "50%", border: "2px solid #C9A96E", backgroundColor: "#EDE8E0", zIndex: 1 }} />
                                    </div>
                                    <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "2.5rem", color: "rgba(201,169,110,0.25)", lineHeight: 1 }}>{step.number}</span>
                                </div>

                                {/* Content */}
                                <div style={{ paddingBottom: "2rem", borderBottom: i < steps.length - 1 ? "1px solid #D9D2C7" : "none" }} className="step-content">
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.75rem" }}>
                                        <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 3vw, 3rem)", lineHeight: 1.1, color: "#1C1C1E" }}>{step.title}</h3>
                                        <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E", backgroundColor: "rgba(201,169,110,0.1)", padding: "0.375rem 0.75rem", flexShrink: 0 }}>
                                            {step.duration}
                                        </span>
                                    </div>
                                    <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", lineHeight: "1.7", color: "#6B6560", maxWidth: "40rem" }}>{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
            <style>{`
        .process-step { grid-template-columns: 5rem 1fr; gap: 0; }
        .step-number-col { padding-left: 1.25rem; justify-content: flex-start; }
        @media (max-width: 767px) {
          .timeline-line-container { display: none; }
          .process-step { grid-template-columns: 4rem 1fr; }
        }
      `}</style>
        </Section>
    );
}
