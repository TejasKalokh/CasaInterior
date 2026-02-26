import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges Tailwind classes safely, resolving conflicts. */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/** Clamps a number between min and max. */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

/** Maps a value from one range to another. */
export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}
