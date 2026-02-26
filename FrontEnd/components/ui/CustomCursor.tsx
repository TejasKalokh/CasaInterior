"use client";

/**
 * CustomCursor — spring-physics magnetic cursor.
 * mix-blend-difference for automatic contrast on any background.
 * Hidden on touch devices.
 */

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springCfg = { damping: 22, stiffness: 220, mass: 0.5 };
    const cursorX = useSpring(mouseX, springCfg);
    const cursorY = useSpring(mouseY, springCfg);
    const scale = useSpring(1, { damping: 20, stiffness: 200 });

    useEffect(() => {
        const move = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
        const enter = () => scale.set(2.2);
        const leave = () => scale.set(1);

        window.addEventListener("mousemove", move);

        const els = document.querySelectorAll("a, button, input, textarea, select, [data-cursor-scale]");
        els.forEach((el) => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });

        return () => {
            window.removeEventListener("mousemove", move);
            els.forEach((el) => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); });
        };
    }, [mouseX, mouseY, scale]);

    return (
        <>
            {/* Outer ring — spring lag, mix-blend-difference */}
            <motion.div
                style={{
                    position: "fixed", top: 0, left: 0,
                    x: cursorX, y: cursorY, scale,
                    translateX: "-50%", translateY: "-50%",
                    pointerEvents: "none", zIndex: 9999,
                    mixBlendMode: "difference",
                }}
                className="cursor-ring"
            >
                <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", border: "1px solid #F7F5F0" }} />
            </motion.div>

            {/* Inner dot — instant */}
            <motion.div
                style={{
                    position: "fixed", top: 0, left: 0,
                    x: mouseX, y: mouseY,
                    translateX: "-50%", translateY: "-50%",
                    pointerEvents: "none", zIndex: 9999,
                }}
                className="cursor-dot"
            >
                <div style={{ width: "0.375rem", height: "0.375rem", borderRadius: "50%", backgroundColor: "#C9A96E" }} />
            </motion.div>

            <style>{`
        @media (pointer: coarse) { .cursor-ring, .cursor-dot { display: none !important; } }
      `}</style>
        </>
    );
}
