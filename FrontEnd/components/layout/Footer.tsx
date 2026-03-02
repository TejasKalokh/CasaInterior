"use client";

import Link from "next/link";
import { Container, Section } from "@/components/ui/Layout";

type FooterLink = {
    label: string;
    href: string;
};

const footerLinks: Record<string, FooterLink[]> = {
    Studio: [
        { label: "About Us", href: "/#about" },
        { label: "Services", href: "/#services" },
        { label: "Projects", href: "/#projects" },
        { label: "Process", href: "/#process" },
        { label: "Contact", href: "/#contact" },
    ],

    Services: [
        { label: "Residential", href: "/#projects" },
        { label: "Commercial", href: "/#projects" },
        { label: "Furniture Design", href: "/#projects" },
        { label: "Visualization", href: "/#projects" },
    ],

    Connect: [
        { label: "Instagram", href: "https://www.instagram.com/casainteriordesign_studio/" },
        { label: "Pinterest", href: "https://pinterest.com/yourhandle" },
        { label: "Behance", href: "https://behance.net/yourhandle" },
        { label: "LinkedIn", href: "https://linkedin.com/company/yourcompany" },
    ],
};

export default function Footer() {
    const handleScroll = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;

        el.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    return (
        <Section id="footer" style={{ backgroundColor: "#1C1C1E", color: "#F7F5F0", paddingTop: "clamp(3rem, 6vw, 5rem)", paddingBottom: "clamp(2rem, 4vw, 3rem)" }}>
            <Container>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem", paddingBottom: "4rem", borderBottom: "1px solid rgba(247,245,240,0.07)" }} className="footer-grid">

                    {/* Brand */}
                    <div>
                        <Link href="/" style={{ display: "flex", flexDirection: "column", lineHeight: 1, textDecoration: "none", marginBottom: "2rem" }}>
                            <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "2rem", letterSpacing: "0.06em", color: "#F7F5F0" }}>CASA</span>
                            <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.5rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C9A96E", marginTop: "0.25rem" }}>Interior</span>
                        </Link>
                        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.875rem", color: "rgba(247,245,240,0.45)", lineHeight: "1.7", maxWidth: "20rem" }}>
                            Creating spaces that transcend the ordinary. Where architecture meets artistry and luxury is a state of mind.
                        </p>
                        <div style={{ marginTop: "2rem" }}>
                            <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A96E" }}>Excellence since 2022</span>
                        </div>
                    </div>

                    {/* Links */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2.5rem" }}>
                        {Object.entries(footerLinks).map(([cat, links]) => (
                            <div key={cat}>
                                <h4 style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "1.5rem" }}>{cat}</h4>
                                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                    {links.map((link) => {
    const isExternal = link.href.startsWith("http");
    const isAnchor = link.href.startsWith("/#");

    if (isAnchor) {
        const id = link.href.replace("/#", "");

        return (
            <li key={link.label}>
                <a
                    onClick={() => handleScroll(id)}
                    className="footer-link"
                    style={{
                        cursor: "pointer",
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "0.875rem",
                        color: "rgba(247,245,240,0.45)",
                        textDecoration: "none",
                        transition: "color 0.3s ease"
                    }}
                >
                    {link.label}
                </a>
            </li>
        );
    }

    return (
        <li key={link.label}>
            <Link
                href={link.href}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="footer-link"
                style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.875rem",
                    color: "rgba(247,245,240,0.45)",
                    textDecoration: "none",
                    transition: "color 0.3s ease"
                }}
            >
                {link.label}
            </Link>
        </li>
    );
})}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom bar */}
                {/* Bottom bar */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem", paddingTop: "2rem" }}>
                                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.75rem", color: "rgba(247,245,240,0.3)" }}>
                                    © {new Date().getFullYear()} Casa Interior. All rights reserved.
                                    {" "} | Designed & Developed by{" "}
                                    <a
                                        href="https://www.linkedin.com/in/tejaskalokhe"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: "#C9A96E",
                                            textDecoration: "none",
                                            marginLeft: "4px"
                                        }}
                                    >
                                        Tejas Kalokhe
                                    </a>
                                </p>
                                <div style={{ display: "flex", gap: "1.5rem" }}>
                                    {["Privacy Policy", "Terms of Service"].map((l) => (
                                        <Link key={l} href="#" className="footer-link" style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.75rem", color: "rgba(247,245,240,0.3)", textDecoration: "none", transition: "color 0.3s ease" }}>
                                            {l}
                                        </Link>
                                    ))}
                                </div>
                 </div>
            </Container>
            <style>{`
        @media (min-width: 1024px) { .footer-grid { grid-template-columns: 5fr 7fr; } }
        .footer-link:hover { color: rgba(247,245,240,0.9) !important; }
      `}</style>
        </Section>

    );
}
