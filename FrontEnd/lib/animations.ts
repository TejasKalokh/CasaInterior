import { Variants } from "framer-motion";

// ─── Easing Curves ───────────────────────────────────────────────────────────

export const EASE_LUXURY = [0.25, 0.1, 0.25, 1] as const;
export const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_SPRING = { type: "spring", stiffness: 100, damping: 20 } as const;

// ─── Fade Up ─────────────────────────────────────────────────────────────────

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: EASE_EXPO_OUT },
    },
};

// ─── Fade In ─────────────────────────────────────────────────────────────────

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.8, ease: EASE_LUXURY },
    },
};

// ─── Fade Left ───────────────────────────────────────────────────────────────

export const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.9, ease: EASE_EXPO_OUT },
    },
};

// ─── Fade Right ──────────────────────────────────────────────────────────────

export const fadeRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.9, ease: EASE_EXPO_OUT },
    },
};

// ─── Scale In ────────────────────────────────────────────────────────────────

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: EASE_EXPO_OUT },
    },
};

// ─── Stagger Container ───────────────────────────────────────────────────────

export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

// ─── Stagger Item ────────────────────────────────────────────────────────────

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: EASE_EXPO_OUT },
    },
};

// ─── Image Reveal ────────────────────────────────────────────────────────────

/** Clip-path based image reveal used in About and Projects sections */
export const imageReveal: Variants = {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: {
        clipPath: "inset(0 0% 0 0)",
        transition: { duration: 1.2, ease: EASE_EXPO_OUT },
    },
};

// ─── Line Draw ───────────────────────────────────────────────────────────────

export const lineExpand: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 0.9, ease: EASE_EXPO_OUT, delay: 0.3 },
    },
};

// ─── Shared Viewport Settings ────────────────────────────────────────────────

export const viewportSettings = {
    once: true,
    margin: "-80px",
} as const;
