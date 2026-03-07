"use client";

/**
 * Navbar — transparent on hero, frosted-glass glass on scroll.
 * Circular clip-path mobile menu reveal.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { EASE_EXPO_OUT } from "@/lib/animations";
import { Container } from "@/components/ui/Layout";

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    // Check if we're on a light background page (not homepage)
    const isHomePage = pathname === "/";

    useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 60);
    };

    handleScroll(); // run once on load
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
}, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const lenis = (window as any).lenis;
            if (lenis) {
                lenis.scrollTo(targetElement, { duration: 1.5, offset: -80 });
            } else {
                // Fallback to native smooth scroll
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        
        // Close mobile menu if open
        if (menuOpen) setMenuOpen(false);
    };

    const [logoHover, setLogoHover] = useState(false);
    
    // Force scrolled state on light pages
    const isNavbarSolid = !isHomePage || scrolled;

    return (
        <>
            <motion.header
                style={{
                    position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
                    borderBottom: isNavbarSolid ? "1px solid rgba(28,28,30,0.07)" : "1px solid transparent",
                    backgroundColor: isNavbarSolid ? "rgba(247,245,240,0.92)" : "transparent",
                    backdropFilter: isNavbarSolid ? "blur(16px)" : "none",
                    boxShadow: isNavbarSolid ? "0 4px 30px rgba(28,28,30,0.06)" : "none",
                    transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: EASE_EXPO_OUT, delay: 0.2 }}
            >
                <Container style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "5rem" }}>

                    {/* Logo — 3D flip on hover */}
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <div
                            style={{
                                perspective: "600px",
                                width: "72px",
                                height: "60px",
                            }}
                            onMouseEnter={() => setLogoHover(true)}
                            onMouseLeave={() => setLogoHover(false)}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    height: "100%",
                                    transformStyle: "preserve-3d",
                                    transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                                    transform: logoHover ? "rotateY(180deg)" : "rotateY(0deg)",
                                }}
                            >
                                {/* Front — text */}
                                <div style={{
                                    position: "absolute", inset: 0,
                                    backfaceVisibility: "hidden",
                                    display: "flex", flexDirection: "column", justifyContent: "center",
                                }}>
                                    <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.25rem", letterSpacing: "0.08em", color: isNavbarSolid ? "#1C1C1E" : "#F7F5F0", transition: "color 0.4s ease" }}>CASA</span>
                                    <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.5rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#C9A96E", marginTop: "0.2rem" }}>Interior</span>
                                </div>

                                {/* Back — logo image */}
                                <div style={{
                                    position: "absolute", inset: 0,
                                    backfaceVisibility: "hidden",
                                    transform: "rotateY(180deg)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    overflow: "hidden",
                                    borderRadius: "4px",
                                }}>
                                    <img
                                        src="/images/Logo.jpg"
                                        alt="Casa Interior Logo"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hidden-mobile">
                        {navLinks.map((link) => (
                            <motion.div
                                key={link.href}
                                whileHover={{ 
                                    letterSpacing: "0.18em",
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={(e) => handleSmoothScroll(e, link.href)}
                                    className="nav-link"
                                    style={{
                                        position: "relative",
                                        fontFamily: "var(--font-inter), sans-serif",
                                        fontSize: "0.7rem",
                                        letterSpacing: "inherit",
                                        textTransform: "uppercase",
                                        color: isNavbarSolid ? "#6B6560" : "rgba(247,245,240,0.75)",
                                        textDecoration: "none",
                                        transition: "color 0.3s ease",
                                        paddingBottom: "0.25rem",
                                    }}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div
                            whileHover={{ 
                                letterSpacing: "0.18em",
                                backgroundColor: isNavbarSolid ? "#2C2C2E" : "rgba(247,245,240,0.2)"
                            }}
                            transition={{ duration: 0.3 }}
                            style={{
                                marginLeft: "1rem",
                                backgroundColor: isNavbarSolid ? "#1C1C1E" : "rgba(247,245,240,0.12)",
                                border: `1px solid ${isNavbarSolid ? "#1C1C1E" : "rgba(247,245,240,0.3)"}`,
                                display: "inline-flex",
                            }}
                        >
                            <Link 
                                href="#contact" 
                                onClick={(e) => handleSmoothScroll(e, '#contact')}
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: "0.75rem",
                                    fontSize: "0.65rem", padding: "0.6rem 1.25rem",
                                    fontFamily: "var(--font-inter), sans-serif", fontWeight: 500,
                                    letterSpacing: "inherit", textTransform: "uppercase", textDecoration: "none",
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "#F7F5F0", cursor: "pointer",
                                }}>
                                Get a Quote
                            </Link>
                        </motion.div>
                    </nav>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{ display: "flex", flexDirection: "column", gap: "6px", padding: "0.5rem", background: "none", border: "none", zIndex: 51, position: "relative" }}
                        aria-label="Toggle menu"
                        className="show-mobile"
                    >
                        <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} style={{ display: "block", width: "24px", height: "1px", backgroundColor: menuOpen ? "#F7F5F0" : (isNavbarSolid ? "#1C1C1E" : "#F7F5F0") }} />
                        <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.2 }} style={{ display: "block", width: "16px", height: "1px", backgroundColor: menuOpen ? "#F7F5F0" : (isNavbarSolid ? "#1C1C1E" : "#F7F5F0") }} />
                        <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} style={{ display: "block", width: "24px", height: "1px", backgroundColor: menuOpen ? "#F7F5F0" : (isNavbarSolid ? "#1C1C1E" : "#F7F5F0") }} />
                    </button>
                </Container>
            </motion.header>

            {/* Mobile overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        style={{ position: "fixed", inset: 0, zIndex: 40, backgroundColor: "#1C1C1E", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
                        initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
                        animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
                        exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
                        transition={{ duration: 0.6, ease: EASE_EXPO_OUT }}
                    >
                        <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2.5rem" }}>
                            {navLinks.map((link, i) => (
                                <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: EASE_EXPO_OUT }}>
                                    <Link 
                                        href={link.href} 
                                        onClick={(e) => handleSmoothScroll(e, link.href)} 
                                        style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#F7F5F0", textDecoration: "none", letterSpacing: "-0.01em", transition: "color 0.3s ease" }}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
                                <Link 
                                    href="#contact" 
                                    onClick={(e) => handleSmoothScroll(e, '#contact')} 
                                    style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", marginTop: "1rem", background: "linear-gradient(135deg, #C9A96E, #E2C99B, #A8844A)", color: "#1C1C1E", padding: "1rem 2rem", fontFamily: "var(--font-inter), sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}
                                >
                                    Get a Quote
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (min-width: 1024px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 1023px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
      `}</style>
        </>
    );
}
