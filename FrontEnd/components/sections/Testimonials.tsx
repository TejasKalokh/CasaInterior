"use client";

/**
 * Testimonials — auto-advancing AnimatePresence fade carousel.
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem, viewportSettings } from "@/lib/animations";
import { Container, Section } from "@/components/ui/Layout";

const testimonials = [
    { id: 1, quote: "Casa Interior didn't just design our home — they understood our life. Every corner feels intentional, every material chosen for a reason. It's the most beautiful space I've ever inhabited.", author: "Priya Mehra", role: "Co-Founder, Mehra Ventures", location: "Mumbai" },
    { id: 2, quote: "The attention to detail is staggering. They sourced marble from Turkey, textiles from Rajasthan, and hardware from Milan — all in perfect harmony. A truly global vision with local soul.", author: "Arjun Kapoor", role: "Architect & Developer", location: "Delhi" },
    { id: 3, quote: "Our hotel lobby has received more compliments than any marketing campaign ever could. Guests tell us it's the most beautiful hotel lobby in India. That's entirely Casa Interior.", author: "Simone D'Souza", role: "General Manager, Grand Obero", location: "New Delhi" },
    { id: 4, quote: "I was skeptical about the investment. Six months later, I cannot imagine having done it any other way. This space makes me proud every single day.", author: "Rahul Singh", role: "Partner, Nexus Law", location: "Bengaluru" },
];

const INTERVAL = 5000;

export default function Testimonials() {
    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState(1);

    const goTo = useCallback((i: number) => {
        setDirection(i > active ? 1 : -1);
        setActive(i);
    }, [active]);

    const next = useCallback(() => {
        setDirection(1);
        setActive((p) => (p + 1) % testimonials.length);
    }, []);

    useEffect(() => {
        const t = setInterval(next, INTERVAL);
        return () => clearInterval(t);
    }, [next]);

    const variants = {
        enter: (d: number) => ({ opacity: 0, x: d * 30 }),
        center: { opacity: 1, x: 0 },
        exit: (d: number) => ({ opacity: 0, x: d * -20 }),
    };

    return (
        <Section id="testimonials" style={{ backgroundColor: "#1C1C1E", overflow: "hidden", position: "relative" }}>
            {/* Subtle background image */}
            <div style={{
                position: "absolute", inset: 0,
                backgroundImage: `url('/images/IMG-20251207-WA0033.jpg')`,
                backgroundSize: "cover", backgroundPosition: "center",
                opacity: 0.07,
            }} />
            <Container style={{ position: "relative", zIndex: 2 }}>

                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSettings} style={{ marginBottom: "4rem" }}>
                    <motion.div variants={staggerItem} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                        <span style={{ display: "block", height: "1px", width: "3rem", backgroundColor: "#C9A96E" }} />
                        <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E" }}>Client Voices</span>
                    </motion.div>
                    <motion.h2 variants={staggerItem} style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 4.5rem)", lineHeight: 1.05, color: "#F7F5F0", maxWidth: "24rem" }}>
                        What our clients <em style={{ fontStyle: "italic", color: "#C9A96E" }}>say</em>.
                    </motion.h2>
                </motion.div>

                {/* Testimonial */}
                <div style={{ position: "relative", minHeight: "18rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    {/* Decorative quote */}
                    <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", position: "absolute", top: "-1rem", left: 0, fontSize: "8rem", lineHeight: 1, color: "rgba(201,169,110,0.08)", userSelect: "none", pointerEvents: "none" }}>"</span>

                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={active}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <blockquote style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 3vw, 3rem)", lineHeight: "1.45", color: "rgba(247,245,240,0.8)", maxWidth: "56rem", marginBottom: "2.5rem", fontStyle: "italic" }}>
                                &ldquo;{testimonials[active].quote}&rdquo;
                            </blockquote>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <div style={{ width: "2.5rem", height: "1px", backgroundColor: "#C9A96E" }} />
                                <div>
                                    <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.875rem", color: "#F7F5F0", fontWeight: 500 }}>{testimonials[active].author}</p>
                                    <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.75rem", color: "rgba(247,245,240,0.4)", marginTop: "0.2rem" }}>{testimonials[active].role} · {testimonials[active].location}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dots + progress */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "3rem" }}>
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            aria-label={`Go to testimonial ${i + 1}`}
                            style={{
                                border: "none", background: i === active ? "#C9A96E" : "rgba(247,245,240,0.2)",
                                borderRadius: "999px",
                                width: i === active ? "2rem" : "0.375rem",
                                height: "0.375rem",
                                transition: "all 0.4s ease",
                                cursor: "pointer",
                                padding: 0,
                            }}
                        />
                    ))}
                    <div style={{ marginLeft: "auto", flex: 1, height: "1px", backgroundColor: "rgba(247,245,240,0.08)", position: "relative", overflow: "hidden" }}>
                        <motion.div
                            key={active}
                            style={{ position: "absolute", inset: 0, backgroundColor: "#C9A96E", left: 0 }}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                        />
                    </div>
                </div>
            </Container>
        </Section>
    );
}
