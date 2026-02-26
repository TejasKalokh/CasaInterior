import { Cormorant_Garamond, Inter } from "next/font/google";

/** Serif font for headings — luxury editorial feel */
export const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    style: ["normal", "italic"],
    variable: "--font-cormorant",
    display: "swap",
    preload: true,
});

/** Sans-serif font for body and UI — modern, clean */
export const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-inter",
    display: "swap",
    preload: true,
});
