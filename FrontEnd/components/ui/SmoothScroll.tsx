"use client";

/**
 * SmoothScroll Provider
 * Initializes Lenis smooth scroll engine and syncs it with GSAP's ticker
 * so ScrollTrigger animations are perfectly in sync with the scroll position.
 */

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
    children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
            orientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 1.5,
        });

        // Make Lenis accessible globally for smooth scroll navigation
        (window as any).lenis = lenis;

        // Sync Lenis RAF with GSAP ticker for perfect ScrollTrigger integration
        lenis.on("scroll", ScrollTrigger.update);

        // Store the callback reference so gsap.ticker.remove() can match it exactly
        const rafCallback = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(rafCallback);
        gsap.ticker.lagSmoothing(0);

        return () => {
            // Remove the exact same function reference — prevents accumulation of RAF loops
            gsap.ticker.remove(rafCallback);
            lenis.destroy();
            delete (window as any).lenis;
        };
    }, []);

    return <>{children}</>;
}
