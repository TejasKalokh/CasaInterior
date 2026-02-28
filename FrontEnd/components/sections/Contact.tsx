"use client";

/**
 * Contact Section — split layout with floating-label inputs.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportSettings } from "@/lib/animations";
import { Container, Section } from "@/components/ui/Layout";

const contactInfo = [
    { label: "Studio", value: "Flat no 106, 1st Floor, Aditya Residency, Handewadi\nPune, Maharashtra 414028" },
    { label: "Email", value: "casainterior04@gmail.com" },
    { label: "Phone", value: "+91 9890999689, +91 9860183920" },
    { label: "Hours", value: "Mon–Sat, 10:00 – 19:00 IST" },
];

const projectTypes = ["Residential", "Commercial Space", "Custom Furniture", "Interior Styling", "Consultation Only", "Other"];

type FF = { value: string; focused: boolean };
const ff = (): FF => ({ value: "", focused: false });

export default function Contact() {
    const [form, setForm] = useState({ name: ff(), email: ff(), phone: ff(), message: ff(), projectType: "" });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const upd = (field: "name" | "email" | "phone" | "message", key: "value" | "focused", val: string | boolean) =>
        setForm((p) => ({ ...p, [field]: { ...p[field], [key]: val } }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name.value,
                    email: form.email.value,
                    phone: form.phone.value,
                    message: form.message.value,
                    projectType: form.projectType || 'Other',
                }),
            });
            if (!res.ok) throw new Error('Failed');
            setSubmitted(true);
        } catch {
            // Surface a brief error — form stays visible for retry
            alert('Something went wrong. Please try again or email us directly.');
        } finally {
            setSubmitting(false);
        }
    };

    const lbl = (field: FF, text: string) => ({
        position: "absolute" as const, left: 0, fontFamily: "var(--font-inter), sans-serif",
        transition: "all 0.3s ease", pointerEvents: "none" as const,
        ...(field.focused || field.value
            ? { fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#C9A96E", top: "-1rem" }
            : { fontSize: "0.9375rem", color: "#6B6560", top: "0.875rem" }),
    });

    return (
        <Section id="contact" style={{ backgroundColor: "#F7F5F0", overflow: "hidden" }}>
            <Container>
                <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: "4rem" }} className="contact-layout">

                    {/* Left info */}
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSettings}>
                        <motion.div variants={staggerItem} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                            <span style={{ display: "block", height: "1px", width: "3rem", backgroundColor: "#C9A96E" }} />
                            <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E" }}>Get in Touch</span>
                        </motion.div>
                        <motion.h2 variants={staggerItem} style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 4.5rem)", lineHeight: 1.05, color: "#1C1C1E", marginBottom: "2rem" }}>
                            Begin your<br /><em style={{ fontStyle: "italic", color: "#C9A96E" }}>transformation</em>.
                        </motion.h2>
                        <motion.p variants={staggerItem} style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", lineHeight: "1.7", color: "#6B6560", maxWidth: "20rem", marginBottom: "2rem" }}>
                            Every great interior begins with a conversation. Tell us about your vision — we&apos;ll take it somewhere extraordinary.
                        </motion.p>
                        <motion.div variants={staggerContainer} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                            {contactInfo.map(({ label, value }) => (
                                <motion.div key={label} variants={staggerItem}>
                                    <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "0.5rem" }}>{label}</p>
                                    <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.875rem", color: "#1C1C1E", whiteSpace: "pre-line", lineHeight: "1.6" }}>{value}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>


                    {/* Right form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        viewport={viewportSettings}
                        style={{ paddingTop: "6rem" }}
                    >
                        {submitted ? (
                            <motion.div
                                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "6rem 0" }}
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
                            >
                                <div style={{ fontSize: "3rem", marginBottom: "1.5rem", color: "#C9A96E" }}>✦</div>
                                <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 3vw, 3rem)", color: "#1C1C1E", marginBottom: "1rem" }}>Thank You</h3>
                                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", lineHeight: "1.7", color: "#6B6560", maxWidth: "22rem" }}>We&apos;ve received your inquiry. Expect a personal response within 24 hours.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }} className="form-row">
                                    {[{ field: "name" as const, label: "Full Name", type: "text", required: true }, { field: "phone" as const, label: "Phone Number", type: "tel", required: false }].map(({ field, label, type, required }) => (
                                        <div key={field} style={{ position: "relative" }}>
                                            <label style={lbl(form[field], label)}>{label}</label>
                                            <input type={type} required={required} className="input-luxury"
                                                value={form[field].value}
                                                onFocus={() => upd(field, "focused", true)}
                                                onBlur={() => upd(field, "focused", false)}
                                                onChange={(e) => upd(field, "value", e.target.value)} />
                                        </div>
                                    ))}
                                </div>

                                <div style={{ position: "relative" }}>
                                    <label style={lbl(form.email, "Email Address")}>Email Address</label>
                                    <input type="email" required className="input-luxury"
                                        value={form.email.value}
                                        onFocus={() => upd("email", "focused", true)}
                                        onBlur={() => upd("email", "focused", false)}
                                        onChange={(e) => upd("email", "value", e.target.value)} />
                                </div>

                                <div>
                                    <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6560", marginBottom: "1rem" }}>Project Type</p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                                        {projectTypes.map((t) => (
                                            <button type="button" key={t} onClick={() => setForm((p) => ({ ...p, projectType: t }))}
                                                className="font-sans"
                                                style={{
                                                    fontSize: "0.75rem", letterSpacing: "0.05em", padding: "0.5rem 1rem",
                                                    border: "1px solid", borderColor: form.projectType === t ? "#1C1C1E" : "#D9D2C7",
                                                    backgroundColor: form.projectType === t ? "#1C1C1E" : "transparent",
                                                    color: form.projectType === t ? "#F7F5F0" : "#6B6560",
                                                    transition: "all 0.3s ease", cursor: "pointer",
                                                }}>
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ position: "relative" }}>
                                    <label style={lbl(form.message, "Tell us about your project")}>Tell us about your project</label>
                                    <textarea rows={4} className="input-luxury" style={{ resize: "none" }}
                                        value={form.message.value}
                                        onFocus={() => upd("message", "focused", true)}
                                        onBlur={() => upd("message", "focused", false)}
                                        onChange={(e) => upd("message", "value", e.target.value)} />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={submitting}
                                    style={{
                                        display: "inline-flex", alignItems: "center", gap: "0.75rem",
                                        background: "linear-gradient(135deg, #C9A96E, #E2C99B, #A8844A)",
                                        color: "#1C1C1E", padding: "1rem 2rem",
                                        fontFamily: "var(--font-inter), sans-serif", fontSize: "0.75rem", fontWeight: 600,
                                        letterSpacing: "0.12em", textTransform: "uppercase",
                                        border: "none", cursor: submitting ? "default" : "pointer",
                                        width: "fit-content", opacity: submitting ? 0.6 : 1,
                                        whiteSpace: "nowrap",
                                    }}
                                    whileHover={!submitting ? { letterSpacing: "0.18em", boxShadow: "0 8px 24px rgba(201,169,110,0.35)" } : {}}
                                    transition={{ duration: 0.3 }}
                                >
                                    {submitting ? (
                                        <>
                                            <span style={{ display: "inline-block", width: "0.75rem", height: "0.75rem", border: "1px solid rgba(28,28,30,0.3)", borderTopColor: "#1C1C1E", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                                            Sending…
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Inquiry</span>
                                            <motion.span whileHover={{ x: 4 }} transition={{ duration: 0.3 }}>→</motion.span>
                                        </>
                                    )}
                                </motion.button>

                                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.75rem", color: "rgba(107,101,96,0.6)" }}>By submitting, you agree to our Privacy Policy. We respond within 24 hours.</p>
                            </form>
                        )}
                    </motion.div>
                </div>

                {/* Studio preview image — full width below grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    viewport={viewportSettings}
                    style={{
                        position: "relative", overflow: "hidden",
                        width: "100%", aspectRatio: "21/9",
                        marginTop: "4rem", borderRadius: "2px",
                    }}
                >
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: `url('/images/IMG-20251207-WA0029.jpg')`,
                        backgroundSize: "cover", backgroundPosition: "center",
                    }} />
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to top, rgba(28,28,30,0.7), transparent)",
                        display: "flex", alignItems: "flex-end", padding: "1.5rem 2rem",
                    }}>
                        <span style={{
                            fontFamily: "var(--font-inter), sans-serif",
                            fontSize: "0.65rem", letterSpacing: "0.25em",
                            textTransform: "uppercase", color: "#C9A96E",
                        }}>Visit our studio →</span>
                    </div>
                </motion.div>
            </Container>
            <style>{`
                @media (max-width: 1023px) { .contact-layout { grid-template-columns: 1fr !important; } }
                @media (max-width: 639px)  { .form-row { grid-template-columns: 1fr !important; } }
            `}</style>
        </Section>

    );
}
