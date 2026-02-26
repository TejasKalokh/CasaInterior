import React from "react";

interface ContainerProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}

/**
 * Container — max-width constrained, horizontally padded.
 * Uses inline styles so padding is ALWAYS applied regardless of CSS class resolution.
 */
export function Container({ children, style, className }: ContainerProps) {
    return (
        <div
            className={className}
            style={{
                width: "100%",
                maxWidth: "1440px",
                marginLeft: "auto",
                marginRight: "auto",
                paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
                paddingRight: "clamp(1.5rem, 5vw, 6rem)",
                ...style,
            }}
        >
            {children}
        </div>
    );
}

interface SectionProps {
    children: React.ReactNode;
    id?: string;
    style?: React.CSSProperties;
    className?: string;
    sectionRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Section — vertical padding block.
 */
export function Section({ children, id, style, className, sectionRef }: SectionProps) {
    return (
        <section
            id={id}
            ref={sectionRef}
            className={className}
            style={{
                paddingTop: "clamp(5rem, 10vw, 9rem)",
                paddingBottom: "clamp(5rem, 10vw, 9rem)",
                ...style,
            }}
        >
            {children}
        </section>
    );
}
