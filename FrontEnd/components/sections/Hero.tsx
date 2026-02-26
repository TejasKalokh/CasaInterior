"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE_EXPO_OUT } from "@/lib/animations";
import { Container } from "@/components/ui/Layout";

gsap.registerPlugin(ScrollTrigger);

const headlineWords = ["Spaces", "That", "Speak", "In", "Luxury."];

const wordVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: (i: number) => ({
        y: "0%",
        opacity: 1,
        transition: { duration: 0.9, ease: EASE_EXPO_OUT, delay: 0.4 + i * 0.1 },
    }),
};

export default function Hero() {
    const bgRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!bgRef.current || !sectionRef.current) return;
        // Promote to GPU layer before ScrollTrigger fires to avoid mid-scroll repaint flash
        sectionRef.current.style.willChange = "transform";
        const ctx = gsap.context(() => {
            gsap.fromTo(bgRef.current, { scale: 1.08 }, { scale: 1, duration: 2.2, ease: "power2.out" });
            gsap.to(bgRef.current, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }, sectionRef);
        return () => {
            ctx.revert();
            // Free compositor memory when section unmounts
            if (sectionRef.current) sectionRef.current.style.willChange = "auto";
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="hero"
            style={{
                position: "relative",
                width: "100%",
                height: "100dvh",
                minHeight: "600px",
                display: "flex",
                alignItems: "flex-end",
                overflow: "hidden",
                backgroundColor: "#1C1C1E",
            }}
        >
            {/* Background */}
            <div ref={bgRef} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
                <div style={{
                    position: "absolute", inset: 0, zIndex: 1,
                    background: "linear-gradient(to bottom, rgba(28,28,30,0.5) 0%, rgba(28,28,30,0.1) 35%, rgba(28,28,30,0.85) 100%)",
                }} />
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `url('/images/IMG-20251207-WA0030.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }} />

            </div>

            {/* Content */}
            <Container style={{ position: "relative", zIndex: 10, paddingBottom: "clamp(4rem, 8vw, 7rem)" }}>
                <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
                    <motion.span
                        style={{ display: "block", fontFamily: "var(--font-inter), sans-serif", fontSize: "0.7rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#C9A96E" }}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        transition={{ duration: 0.7, ease: EASE_EXPO_OUT, delay: 0.2 }}
                    >
                        Est. 2014 · Interior Excellence
                    </motion.span>
                </div>

                <h1 style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(3.5rem, 8vw, 9rem)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.03em",
                    color: "#F7F5F0",
                    marginBottom: "1.75rem",
                    fontWeight: 400,
                }}>
                    <span style={{ display: "flex", flexWrap: "wrap", gap: "0.25em" }}>
                        {headlineWords.map((word, i) => (
                            <span key={i} style={{ display: "block", overflow: "hidden" }}>
                                <motion.span style={{ display: "block" }} variants={wordVariants} custom={i} initial="hidden" animate="visible">
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                    </span>
                </h1>

                <div style={{ overflow: "hidden", marginBottom: "2.5rem" }}>
                    <motion.p
                        style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", lineHeight: "1.7", color: "rgba(247,245,240,0.60)", maxWidth: "28rem" }}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        transition={{ duration: 0.8, ease: EASE_EXPO_OUT, delay: 1.0 }}
                    >
                        Award-winning interior design for those who demand the extraordinary.
                    </motion.p>
                </div>

                <motion.div
                    style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE_EXPO_OUT, delay: 1.15 }}
                >
                    <motion.a
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            const target = document.getElementById('projects');
                            if (target) {
                                const lenis = (window as any).lenis;
                                if (lenis) {
                                    lenis.scrollTo(target, { duration: 1.5, offset: -80 });
                                } else {
                                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }
                        }}
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "0.75rem",
                            background: "linear-gradient(135deg, #C9A96E, #E2C99B, #A8844A)",
                            color: "#1C1C1E", padding: "1rem 2rem",
                            fontFamily: "var(--font-inter), sans-serif", fontSize: "0.75rem", fontWeight: 600,
                            letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none",
                            border: "none", cursor: "pointer", whiteSpace: "nowrap",
                        }}
                        whileHover={{ letterSpacing: "0.18em", boxShadow: "0 8px 24px rgba(201,169,110,0.35)" }}
                        transition={{ duration: 0.3 }}
                    >
                        Explore Projects <motion.span whileHover={{ x: 4 }} transition={{ duration: 0.3 }}>→</motion.span>
                    </motion.a>
                    <motion.a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            const target = document.getElementById('contact');
                            if (target) {
                                const lenis = (window as any).lenis;
                                if (lenis) {
                                    lenis.scrollTo(target, { duration: 1.5, offset: -80 });
                                } else {
                                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }
                        }}
                        style={{
                            display: "inline-flex", alignItems: "center",
                            background: "transparent", color: "#F7F5F0", padding: "1rem 2rem",
                            fontFamily: "var(--font-inter), sans-serif", fontSize: "0.75rem", fontWeight: 500,
                            letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none",
                            border: "1px solid rgba(247,245,240,0.3)", cursor: "pointer", whiteSpace: "nowrap",
                        }}
                        whileHover={{
                            letterSpacing: "0.18em",
                            borderColor: "rgba(201,169,110,0.8)",
                            backgroundColor: "rgba(201,169,110,0.08)"
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        Schedule Consultation
                    </motion.a>
                </motion.div>
            </Container>

            {/* Scroll indicator */}
            <motion.div
                style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
            >
                <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(247,245,240,0.4)" }}>Scroll</span>
                <motion.div
                    style={{ width: "1px", height: "3rem", background: "linear-gradient(to bottom, rgba(247,245,240,0.4), transparent)" }}
                    animate={{ scaleY: [0, 1, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            {/* Stats strip */}
            <motion.div
                style={{ position: "absolute", bottom: 0, right: 0, zIndex: 10, display: "flex" }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.8, ease: EASE_EXPO_OUT }}
            >
                {[{ value: "200+", label: "Projects" }, { value: "12", label: "Awards" }, { value: "9", label: "Years" }].map((s) => (
                    <div key={s.label} style={{ padding: "1.25rem 2rem", backdropFilter: "blur(12px)", backgroundColor: "rgba(28,28,30,0.55)", borderLeft: "1px solid rgba(247,245,240,0.08)" }}>
                        <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.5rem", color: "#C9A96E" }}>{s.value}</div>
                        <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(247,245,240,0.4)", marginTop: "0.25rem" }}>{s.label}</div>
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
