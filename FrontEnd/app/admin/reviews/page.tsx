"use client";

/**
 * Admin — Reviews Page
 * Full CRUD: list, add, edit, toggle active, delete
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Plus, Pencil, Trash2, Eye, EyeOff, X, RefreshCw } from "lucide-react";
import apiClient from "@/lib/api";
import type { ApiResponse, ReviewResponse, ReviewRequest } from "@/lib/types";
import { useToast } from "@/context/ToastContext";

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
    return (
        <div style={{ display: "flex", gap: "4px" }}>
            {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} onClick={() => onChange?.(n)} style={{ width: "18px", height: "18px", fill: n <= value ? "#C9A96E" : "transparent", color: n <= value ? "#C9A96E" : "rgb(212 212 212)", cursor: onChange ? "pointer" : "default" }} />
            ))}
        </div>
    );
}

const BLANK_FORM: ReviewRequest = { quote: "", author: "", role: "", location: "", rating: 5, active: true };

export default function AdminReviewsPage() {
    const toast = useToast();
    const [reviews, setReviews] = useState<ReviewResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<ReviewResponse | null>(null);
    const [form, setForm] = useState<ReviewRequest>(BLANK_FORM);
    const [saving, setSaving] = useState(false);
    const [busy, setBusy] = useState<number | null>(null);

    const fetchReviews = useCallback(async () => {
        setLoading(true);
        try {
            const res = await apiClient.get<ApiResponse<{ content: ReviewResponse[] }>>("/admin/reviews");
            setReviews(res.data.data?.content ?? []);
        } catch { toast.error("Failed to load reviews."); }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchReviews(); }, [fetchReviews]);

    const openAdd = () => { setEditing(null); setForm(BLANK_FORM); setShowForm(true); };
    const openEdit = (r: ReviewResponse) => {
        setEditing(r);
        setForm({ quote: r.quote, author: r.author, role: r.role, location: r.location, rating: r.rating, active: r.active });
        setShowForm(true);
    };

    const save = async () => {
        if (saving) return;
        setSaving(true);
        try {
            if (editing) {
                await apiClient.put(`/admin/reviews/${editing.id}`, form);
                toast.success('Review updated.');
            } else {
                await apiClient.post('/admin/reviews', form);
                toast.success('Review added.');
            }
            setShowForm(false);
            fetchReviews();
        } catch { toast.error('Failed to save review.'); }
        finally { setSaving(false); }
    };

    const toggle = async (r: ReviewResponse) => {
        if (busy !== null) return;
        setBusy(r.id);
        try {
            await apiClient.patch(`/admin/reviews/${r.id}/toggle`);
            toast.success(r.active ? 'Review hidden.' : 'Review made active.');
            setReviews((prev) => prev.map((rv) => rv.id === r.id ? { ...rv, active: !rv.active } : rv));
        } catch { toast.error('Failed to toggle.'); }
        finally { setBusy(null); }
    };

    const del = async (id: number) => {
        if (busy !== null) return;
        if (!confirm('Delete this review?')) return;
        setBusy(id);
        try {
            await apiClient.delete(`/admin/reviews/${id}`);
            toast.success('Review deleted.');
            setReviews((prev) => prev.filter((r) => r.id !== id));
        } catch { toast.error('Failed to delete.'); }
        finally { setBusy(null); }
    };

    const f = (k: keyof ReviewRequest, v: string | number | boolean) => setForm((p) => ({ ...p, [k]: v }));

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
                <div>
                    <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "32px", color: "rgb(23 23 23)" }}>Reviews</h2>
                    <p style={{ color: "rgb(115 115 115)", fontSize: "14px", marginTop: "4px" }}>Manage client testimonials</p>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={openAdd} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px", background: "linear-gradient(to right, #C9A96E, #A8844A)", color: "white", border: "none", borderRadius: "12px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                    <Plus style={{ width: "18px", height: "18px" }} /> Add Review
                </motion.button>
            </div>



            {/* Grid */}
            {loading ? (
                <div style={{ textAlign: "center", padding: "64px", color: "rgb(115 115 115)" }}>
                    <RefreshCw style={{ width: "32px", height: "32px", animation: "spin 1s linear infinite", margin: "0 auto 12px", color: "#C9A96E" }} />
                    Loading reviews…
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
                    {reviews.map((r, i) => (
                        <motion.div key={r.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} style={{ background: "white", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.08)", border: `1px solid ${r.active ? "rgb(220 252 231)" : "rgb(245 245 245)"}`, opacity: r.active ? 1 : 0.65 }}>
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                                <StarRating value={r.rating} />
                                <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", background: r.active ? "rgb(220 252 231)" : "rgb(244 244 245)", color: r.active ? "rgb(22 163 74)" : "rgb(115 115 115)" }}>{r.active ? "Active" : "Hidden"}</span>
                            </div>
                            <p style={{ fontSize: "14px", color: "rgb(64 64 64)", lineHeight: "1.7", marginBottom: "16px", fontStyle: "italic" }}>&ldquo;{r.quote}&rdquo;</p>
                            <div style={{ marginBottom: "16px" }}>
                                <p style={{ fontSize: "14px", fontWeight: "600", color: "rgb(23 23 23)" }}>{r.author}</p>
                                <p style={{ fontSize: "12px", color: "rgb(115 115 115)", marginTop: "2px" }}>{r.role} · {r.location}</p>
                            </div>
                            <div style={{ display: "flex", gap: "6px" }}>
                                <button onClick={() => openEdit(r)} style={{ padding: "6px 12px", borderRadius: "8px", border: "none", background: "rgb(245 245 245)", color: "rgb(64 64 64)", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                                    <Pencil style={{ width: "13px", height: "13px" }} /> Edit
                                </button>
                                <button onClick={() => toggle(r)} style={{ padding: "6px 12px", borderRadius: "8px", border: "none", background: r.active ? "rgb(254 249 195)" : "rgb(220 252 231)", color: r.active ? "rgb(161 98 7)" : "rgb(22 163 74)", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                                    {r.active ? <EyeOff style={{ width: "13px", height: "13px" }} /> : <Eye style={{ width: "13px", height: "13px" }} />}
                                    {r.active ? "Hide" : "Show"}
                                </button>
                                <button onClick={() => del(r.id)} style={{ padding: "6px 12px", borderRadius: "8px", border: "none", background: "rgb(254 242 242)", color: "rgb(220 38 38)", fontSize: "12px", cursor: "pointer", marginLeft: "auto", display: "flex", alignItems: "center", gap: "4px" }}>
                                    <Trash2 style={{ width: "13px", height: "13px" }} /> Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Add / Edit Modal */}
            <AnimatePresence>
                {showForm && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowForm(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100 }} />
                        <style>{`
                          .reviews-modal { left: calc(50% + 140px); }
                          @media(max-width:1023px){ .reviews-modal { left: 50%; } }
                        `}</style>
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="reviews-modal" style={{ position: "fixed", top: "50%", transform: "translate(-50%,-50%)", width: "min(560px, calc(100vw - 32px))", background: "white", borderRadius: "20px", padding: "32px", boxShadow: "0 40px 80px rgba(0,0,0,0.25)", zIndex: 110, maxHeight: "90vh", overflowY: "auto" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", color: "rgb(23 23 23)" }}>{editing ? "Edit Review" : "Add Review"}</h3>
                                <button onClick={() => setShowForm(false)} style={{ padding: "8px", borderRadius: "8px", border: "none", background: "transparent", cursor: "pointer" }}><X style={{ width: "20px", height: "20px", color: "rgb(115 115 115)" }} /></button>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                                {([["quote", "Quote / Testimonial *", "textarea"], ["author", "Author Name *", "text"], ["role", "Role / Title", "text"], ["location", "Location", "text"]] as [keyof ReviewRequest, string, string][]).map(([key, label, type]) => (
                                    <div key={key}>
                                        <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgb(82 82 82)", marginBottom: "6px", fontWeight: "600" }}>{label}</label>
                                        {type === "textarea"
                                            ? <textarea value={form[key] as string} onChange={(e) => f(key, e.target.value)} rows={3} style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid rgb(229 229 229)", fontSize: "14px", resize: "vertical", outline: "none", boxSizing: "border-box" }} />
                                            : <input value={form[key] as string} onChange={(e) => f(key, e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid rgb(229 229 229)", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                                        }
                                    </div>
                                ))}
                                <div>
                                    <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgb(82 82 82)", marginBottom: "10px", fontWeight: "600" }}>Rating</label>
                                    <StarRating value={form.rating} onChange={(v) => f("rating", v)} />
                                </div>
                                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                                    <input type="checkbox" checked={!!form.active} onChange={(e) => f("active", e.target.checked)} style={{ width: "16px", height: "16px", accentColor: "#C9A96E" }} />
                                    <span style={{ fontSize: "14px", color: "rgb(64 64 64)" }}>Active (visible on website)</span>
                                </label>

                                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={save} disabled={saving} aria-busy={saving} style={{ padding: "13px", borderRadius: "10px", background: saving ? "rgb(212 212 212)" : "linear-gradient(135deg, #C9A96E, #A8844A)", color: saving ? "rgb(115 115 115)" : "white", border: "none", fontSize: "14px", fontWeight: "600", cursor: saving ? "not-allowed" : "pointer" }}>
                                    {saving ? "Saving…" : (editing ? "Save Changes" : "Add Review")}
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}
