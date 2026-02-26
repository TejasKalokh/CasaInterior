"use client";

/**
 * Services Section — 6-card dark grid with hover elevation.
 */

import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportSettings } from "@/lib/animations";
import { Container, Section } from "@/components/ui/Layout";

const services = [
    { number: "01", title: "Luxury Residential", description: "Bespoke interiors for private residences — from urban penthouses to countryside estates. Every material chosen for its story.", tags: ["Bespoke Design", "Full Renovation", "Turnkey"] },
    { number: "02", title: "Commercial Spaces", description: "Hospitality, retail, and corporate environments designed to create presence, inspire loyalty, and perform beautifully.", tags: ["Hospitality", "Retail", "Corporate"] },
    { number: "03", title: "Custom Furniture", description: "Handcrafted pieces conceived in-house and realized by master artisans. Limited editions and signature collections.", tags: ["Handcrafted", "Limited Edition", "Bespoke"] },
    { number: "04", title: "Visualization", description: "Photorealistic renders and immersive walkthroughs that make design decisions confident before a single wall goes up.", tags: ["3D Rendering", "VR Walkthrough", "Animation"] },
    { number: "05", title: "Interior Styling", description: "Art direction, object curation, and material layering for spaces that are already built but need the final luxury touch.", tags: ["Curation", "Art Direction", "Staging"] },
    { number: "06", title: "Design Consultation", description: "Strategic one-day sessions offering expert perspective on your space, materials palette, and spatial flow.", tags: ["1-Day Session", "Materials", "Strategy"] },
];

export default function Services() {
    return (
        <Section id="services" style={{ backgroundColor: "#1C1C1E", overflow: "hidden" }}>
            <Container>
                {/* Header */}
                <motion.div
                    style={{ marginBottom: "4rem" }}
                    initial="hidden" whileInView="visible" viewport={viewportSettings}
                    variants={staggerContainer}
                >
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "2rem" }}>
                        <div>
                            <motion.div variants={staggerItem} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                                <span style={{ display: "block", height: "1px", width: "3rem", backgroundColor: "#C9A96E" }} />
                                <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E" }}>What We Do</span>
                            </motion.div>
                            <motion.h2 variants={staggerItem} style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "#F7F5F0", maxWidth: "28rem" }}>
                                Services crafted<br />for <em style={{ fontStyle: "italic", color: "#C9A96E" }}>exacting</em> taste.
                            </motion.h2>
                        </div>
                        <motion.p variants={staggerItem} style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", lineHeight: "1.7", color: "rgba(247,245,240,0.4)", maxWidth: "22rem" }}>
                            From concept to completion — we handle every layer of your space with precision.
                        </motion.p>
                    </div>
                </motion.div>

                {/* Grid */}
                <motion.div
                    style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "1px", backgroundColor: "rgba(247,245,240,0.06)" }}
                    className="services-grid"
                    variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSettings}
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.number}
                            variants={staggerItem}
                            className="service-card"
                            style={{
                                backgroundColor: "#1C1C1E",
                                padding: "2.5rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1.25rem",
                                position: "relative",
                                transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                                cursor: "pointer",
                            }}
                            whileHover={{ y: -4, backgroundColor: "#2C2C2E" }}
                        >
                            <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "3rem", lineHeight: 1, color: "rgba(201,169,110,0.2)", userSelect: "none" }}>{service.number}</span>
                            <div style={{ height: "1px", backgroundColor: "rgba(201,169,110,0.2)", width: "100%", transition: "background-color 0.4s ease" }} className="card-line" />
                            <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontSize: "1.3rem", color: "#F7F5F0" }}>{service.title}</h3>
                            <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.875rem", color: "rgba(247,245,240,0.4)", lineHeight: "1.7", flex: 1 }}>{service.description}</p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "auto" }}>
                                {service.tags.map((tag) => (
                                    <span key={tag} style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.25rem 0.75rem", border: "1px solid rgba(247,245,240,0.1)", color: "rgba(247,245,240,0.3)" }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div style={{ position: "absolute", top: "2rem", right: "2rem", color: "#C9A96E", fontSize: "0.875rem", opacity: 0, transition: "opacity 0.3s ease" }} className="card-arrow">↗</div>
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
            <style>{`
        @media (min-width: 640px)  { .services-grid { grid-template-columns: repeat(2,1fr); } }
        @media (min-width: 1024px) { .services-grid { grid-template-columns: repeat(3,1fr); } }
        .service-card:hover .card-line { background-color: #C9A96E !important; }
        .service-card:hover .card-arrow { opacity: 1 !important; }
      `}</style>
        </Section>
    );
}
