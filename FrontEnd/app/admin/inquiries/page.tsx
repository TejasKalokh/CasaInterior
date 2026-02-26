"use client";

/**
 * Admin — Inquiries Page
 *
 * - Fetches real data from GET /admin/inquiries (paginated, filterable)
 * - 300ms debounce on search input (per user review)
 * - Status filter: NEW | READ | ARCHIVED
 * - Mark as Read (PATCH /admin/inquiries/{id}/status)
 * - Delete (DELETE /admin/inquiries/{id})
 * - Expandable inline drawer instead of a separate component for simplicity
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Inbox, Trash2, CheckCircle, Archive, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import apiClient from "@/lib/api";
import type { ApiResponse, ApiPage, InquiryResponse, InquiryStatus } from "@/lib/types";
import { useToast } from "@/context/ToastContext";

const STATUS_BADGE: Record<InquiryStatus, { bg: string; text: string; label: string }> = {
    NEW: { bg: "rgb(219 234 254)", text: "rgb(37 99 235)", label: "New" },
    READ: { bg: "rgb(220 252 231)", text: "rgb(22 163 74)", label: "Read" },
    ARCHIVED: { bg: "rgb(244 244 245)", text: "rgb(82 82 91)", label: "Archived" },
};

export default function AdminInquiriesPage() {
    const toast = useToast();
    const [inquiries, setInquiries] = useState<InquiryResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<InquiryStatus | "ALL">("ALL");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [expanded, setExpanded] = useState<number | null>(null);
    const [busy, setBusy] = useState<number | null>(null);

    const fetchInquiries = useCallback(async (q: string) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ page: page.toString(), size: "10" });
            if (q) params.set("search", q);
            if (filter !== "ALL") params.set("status", filter);
            const res = await apiClient.get<ApiResponse<ApiPage<InquiryResponse>>>(
                `/admin/inquiries?${params}`
            );
            setInquiries(res.data.data.content ?? []);
            setTotalPages(res.data.data.totalPages ?? 1);
        } catch {
            toast.error("Failed to load inquiries.");
        } finally {
            setLoading(false);
        }
    }, [page, filter]);

    // 300ms debounce on search — per user review
    useEffect(() => {
        const handler = setTimeout(() => fetchInquiries(search), 300);
        return () => clearTimeout(handler);
    }, [search, fetchInquiries]);

    const setStatus = async (id: number, status: InquiryStatus) => {
        if (busy !== null) return;
        setBusy(id);
        try {
            await apiClient.patch(`/admin/inquiries/${id}/status?status=${status}`);
            toast.success(status === 'READ' ? 'Marked as read.' : 'Inquiry archived.');
            setInquiries((prev) => prev.map((i) => i.id === id ? { ...i, status } : i));
        } catch { toast.error('Failed to update status.'); }
        finally { setBusy(null); }
    };

    const deleteInquiry = async (id: number) => {
        if (busy !== null) return;
        if (!confirm('Delete this inquiry?')) return;
        setBusy(id);
        try {
            await apiClient.delete(`/admin/inquiries/${id}`);
            toast.success('Inquiry deleted.');
            setInquiries((prev) => prev.filter((i) => i.id !== id));
        } catch { toast.error('Failed to delete.'); }
        finally { setBusy(null); }
    };

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Header */}
            <div style={{ marginBottom: "32px" }}>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "32px", color: "rgb(23 23 23)" }}>Inquiries</h2>
                <p style={{ color: "rgb(115 115 115)", fontSize: "14px", marginTop: "4px" }}>Manage client inquiries and messages</p>
            </div>


            {/* Search + filters */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
                {/* Search */}
                <div style={{ position: "relative", flex: 1, minWidth: "220px" }}>
                    <Search style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: "18px", height: "18px", color: "rgb(163 163 163)" }} />
                    <input
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                        placeholder="Search by name, email…"
                        style={{ width: "100%", padding: "11px 14px 11px 42px", borderRadius: "10px", border: "1px solid rgb(229 229 229)", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                        onFocus={(e) => { e.target.style.borderColor = "#C9A96E"; e.target.style.boxShadow = "0 0 0 3px rgba(201,169,110,0.1)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "rgb(229 229 229)"; e.target.style.boxShadow = "none"; }}
                    />
                </div>

                {/* Status filter */}
                {(["ALL", "NEW", "READ", "ARCHIVED"] as const).map((s) => (
                    <button
                        key={s}
                        onClick={() => { setFilter(s); setPage(0); }}
                        style={{ padding: "10px 18px", borderRadius: "10px", border: "1px solid", borderColor: filter === s ? "#C9A96E" : "rgb(229 229 229)", background: filter === s ? "rgba(201,169,110,0.1)" : "white", color: filter === s ? "#A8844A" : "rgb(115 115 115)", fontSize: "13px", fontWeight: filter === s ? "600" : "400", cursor: "pointer", transition: "all 0.2s" }}
                    >
                        {s === "ALL" ? "All" : STATUS_BADGE[s as InquiryStatus].label}
                    </button>
                ))}
            </div>

            {/* List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} style={{ background: "white", borderRadius: "12px", padding: "20px 24px", border: "1px solid rgb(245 245 245)", boxShadow: "0 1px 3px rgb(0 0 0 / 0.05)", height: "76px", animation: "shimmer 1.5s infinite", backgroundImage: "linear-gradient(90deg,#f3f3f3 25%,#e8e8e8 50%,#f3f3f3 75%)", backgroundSize: "200% 100%" }} />
                    ))
                ) : inquiries.length === 0 ? (
                    <div style={{ padding: "64px 32px", textAlign: "center", background: "white", borderRadius: "16px", border: "1px solid rgb(245 245 245)" }}>
                        <Inbox style={{ width: "48px", height: "48px", color: "rgb(212 212 212)", margin: "0 auto 16px" }} />
                        <p style={{ color: "rgb(115 115 115)", fontSize: "15px" }}>No inquiries found</p>
                    </div>
                ) : (
                    <AnimatePresence>
                        {inquiries.map((inq, i) => {
                            const badge = STATUS_BADGE[inq.status];
                            const isOpen = expanded === inq.id;
                            return (
                                <motion.div
                                    key={inq.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.04 }}
                                    style={{ background: "white", borderRadius: "14px", border: `1px solid ${isOpen ? "#C9A96E" : "rgb(245 245 245)"}`, boxShadow: isOpen ? "0 0 0 2px rgba(201,169,110,0.1)" : "0 1px 3px rgb(0 0 0 / 0.05)", overflow: "hidden", transition: "border-color 0.2s" }}
                                >
                                    {/* Row */}
                                    <div
                                        onClick={() => setExpanded(isOpen ? null : inq.id)}
                                        style={{ display: "flex", alignItems: "center", gap: "16px", padding: "18px 24px", cursor: "pointer", flexWrap: "wrap" }}
                                    >
                                        <div style={{ flex: 1, minWidth: "180px" }}>
                                            <p style={{ fontSize: "15px", fontWeight: inq.status === "NEW" ? "600" : "500", color: "rgb(23 23 23)" }}>{inq.name}</p>
                                            <p style={{ fontSize: "12px", color: "rgb(115 115 115)", marginTop: "2px" }}>{inq.email} · {inq.phone}</p>
                                        </div>
                                        <div style={{ flex: 1, minWidth: "120px" }}>
                                            <p style={{ fontSize: "13px", color: "rgb(82 82 82)" }}>{inq.projectType}</p>
                                            <p style={{ fontSize: "12px", color: "rgb(163 163 163)", marginTop: "2px" }}>{new Date(inq.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                                        </div>
                                        <span style={{ padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", background: badge.bg, color: badge.text }}>{badge.label}</span>
                                        {isOpen ? <ChevronUp style={{ width: "18px", height: "18px", color: "rgb(115 115 115)", flexShrink: 0 }} /> : <ChevronDown style={{ width: "18px", height: "18px", color: "rgb(115 115 115)", flexShrink: 0 }} />}
                                    </div>

                                    {/* Expanded */}
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                style={{ overflow: "hidden" }}
                                            >
                                                <div style={{ padding: "0 24px 20px", borderTop: "1px solid rgb(245 245 245)" }}>
                                                    <p style={{ fontSize: "14px", color: "rgb(64 64 64)", lineHeight: "1.7", paddingTop: "16px", marginBottom: "16px" }}>{inq.message}</p>
                                                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                                        {inq.status !== "READ" && (
                                                            <button onClick={() => setStatus(inq.id, "READ")} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "8px", border: "none", background: "rgb(220 252 231)", color: "rgb(22 163 74)", fontSize: "13px", fontWeight: "500", cursor: "pointer" }}>
                                                                <CheckCircle style={{ width: "15px", height: "15px" }} /> Mark Read
                                                            </button>
                                                        )}
                                                        {inq.status !== "ARCHIVED" && (
                                                            <button onClick={() => setStatus(inq.id, "ARCHIVED")} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "8px", border: "none", background: "rgb(244 244 245)", color: "rgb(82 82 91)", fontSize: "13px", fontWeight: "500", cursor: "pointer" }}>
                                                                <Archive style={{ width: "15px", height: "15px" }} /> Archive
                                                            </button>
                                                        )}
                                                        <button onClick={() => deleteInquiry(inq.id)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "8px", border: "none", background: "rgb(254 242 242)", color: "rgb(220 38 38)", fontSize: "13px", fontWeight: "500", cursor: "pointer", marginLeft: "auto" }}>
                                                            <Trash2 style={{ width: "15px", height: "15px" }} /> Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", marginTop: "24px" }}>
                    <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} style={{ padding: "8px 20px", borderRadius: "10px", border: "1px solid rgb(229 229 229)", background: page === 0 ? "rgb(250 250 250)" : "white", cursor: page === 0 ? "not-allowed" : "pointer", fontSize: "14px", color: page === 0 ? "rgb(163 163 163)" : "rgb(23 23 23)" }}>Previous</button>
                    <span style={{ fontSize: "14px", color: "rgb(115 115 115)" }}>Page {page + 1} of {totalPages}</span>
                    <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} style={{ padding: "8px 20px", borderRadius: "10px", border: "1px solid rgb(229 229 229)", background: page === totalPages - 1 ? "rgb(250 250 250)" : "white", cursor: page === totalPages - 1 ? "not-allowed" : "pointer", fontSize: "14px", color: page === totalPages - 1 ? "rgb(163 163 163)" : "rgb(23 23 23)" }}>Next</button>
                </div>
            )}

            <style>{`
                @keyframes shimmer { 0% { background-position:-200% 0; } 100% { background-position:200% 0; } }
            `}</style>
        </div>
    );
}
