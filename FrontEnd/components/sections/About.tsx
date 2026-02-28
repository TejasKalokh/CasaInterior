"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportSettings } from "@/lib/animations";
import { Container, Section } from "@/components/ui/Layout";

const qualities = [
    { label: "Philosophy", value: "Less, but better. Every element earns its place." },
    { label: "Approach", value: "We listen before we design. Space is personal." },
    { label: "Materials", value: "Curated sourcing from artisans across 14 countries." },
];

const SERIF = "var(--font-cormorant), Georgia, serif";
const SANS = "var(--font-inter), system-ui, sans-serif";

export default function About() {
    return (
        <Section id="about" style={{ backgroundColor: "#F7F5F0", overflow: "hidden" }}>
            <Container>
                {/* 2-column grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
                    gap: "clamp(3rem, 6vw, 6rem)",
                    alignItems: "center",
                }}>

                    {/* LEFT: Text */}
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSettings}>
                        <motion.div variants={staggerItem} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                            <span style={{ display: "block", height: "1px", width: "3rem", backgroundColor: "#C9A96E" }} />
                            <span style={{ fontFamily: SANS, fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E" }}>About the Studio</span>
                        </motion.div>

                        <motion.h2 variants={staggerItem} style={{
                            fontFamily: SERIF, fontWeight: 400,
                            fontSize: "clamp(2rem, 4vw, 4.5rem)",
                            lineHeight: 1.05, letterSpacing: "-0.02em",
                            color: "#1C1C1E", marginBottom: "2rem",
                        }}>
                            Design is how it<br />
                            <em style={{ fontStyle: "italic", color: "#C9A96E" }}>feels</em>, not just<br />
                            how it looks.
                        </motion.h2>

                        <motion.p variants={staggerItem} style={{ fontFamily: SANS, fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", color: "#6B6560", lineHeight: "1.8", marginBottom: "2.5rem", maxWidth: "30rem" }}>
                            Founded in 2022, Casa Interior transforms living and working environments into masterpieces of spatial harmony.
                            We blend architecture, psychology, and artisanship to craft spaces that feel inevitable — as though they could exist nowhere else.
                        </motion.p>

                        <motion.div variants={staggerItem} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "3rem" }}>
                            {qualities.map(({ label, value }) => (
                                <div key={label} style={{ display: "flex", gap: "1.5rem" }}>
                                    <div style={{ width: "1px", backgroundColor: "#D9D2C7", flexShrink: 0 }} />
                                    <div>
                                        <p style={{ fontFamily: SANS, fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "0.2rem" }}>{label}</p>
                                        <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "#6B6560" }}>{value}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div variants={staggerItem}>
                            <motion.a 
                                href="#services"
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: "0.75rem",
                                    background: "transparent", color: "#1C1C1E", padding: "1rem 2rem",
                                    fontFamily: SANS, fontSize: "0.75rem", fontWeight: 500,
                                    letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none",
                                    border: "1px solid rgba(28,28,30,0.3)", cursor: "pointer",
                                }}
                                whileHover={{ 
                                    letterSpacing: "0.18em",
                                    borderColor: "rgba(28,28,30,0.8)",
                                    backgroundColor: "rgba(28,28,30,0.05)"
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                Our Services <span>→</span>
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT: Images */}
                    <div style={{ position: "relative", width: "100%" }}>
                        {/* Primary */}
                        <motion.div
                            style={{ position: "relative", overflow: "hidden", width: "100%", aspectRatio: "4/5", borderRadius: "2px" }}
                            initial={{ clipPath: "inset(0 100% 0 0)" }}
                            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            viewport={viewportSettings}
                        >
                            <motion.div
                                style={{ width: "100%", height: "100%" }}
                                initial={{ scale: 1.12 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                                viewport={viewportSettings}
                            >
                                <div style={{
                                    width: "100%", height: "100%",
                                    backgroundImage: `url('/images/IMG-20251207-WA0035.jpg')`,
                                    backgroundSize: "cover", backgroundPosition: "center",
                                }} />
                            </motion.div>
                        </motion.div>

                        {/* Floating secondary — hidden on mobile via inline media */}
                        <motion.div
                            style={{
                                position: "absolute", bottom: "-2rem", left: "-1.5rem",
                                width: "45%", aspectRatio: "1",
                                overflow: "hidden",
                                border: "4px solid #F7F5F0",
                                boxShadow: "0 16px 60px rgba(28,28,30,0.15)",
                                zIndex: 2,
                            }}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                            viewport={viewportSettings}
                            className="about-float"
                        >
                            <div style={{
                                width: "100%", height: "100%",
                                backgroundImage: `url('/images/IMG-20251207-WA0020.jpg')`,
                                backgroundSize: "cover", backgroundPosition: "center",
                            }} />
                        </motion.div>

                        {/* Gold accent */}
                        <motion.div
                            className="about-accent"
                            style={{ position: "absolute", top: "-1.5rem", right: "-1.5rem", width: "4rem", height: "4rem", border: "1px solid rgba(201,169,110,0.4)" }}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            viewport={viewportSettings}
                        />
                    </div>
                </div>
            </Container>
            <style>{`
        @media (max-width: 767px) {
          .about-float  { display: none !important; }
          .about-accent { display: none !important; }
        }
      `}</style>
        </Section>
    );
}
