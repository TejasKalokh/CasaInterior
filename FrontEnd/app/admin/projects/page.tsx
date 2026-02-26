"use client";

/**
 * Admin — Projects List Page
 * Fetches from GET /admin/projects (paginated), supports status filter.
 * Actions: Publish/Archive (PATCH status), Delete.
 */

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Eye, EyeOff, RefreshCw, FolderOpen } from "lucide-react";
import apiClient from "@/lib/api";
import type { ApiResponse, ApiPage, ProjectListResponse, ProjectStatus } from "@/lib/types";
import { useToast } from "@/context/ToastContext";

const STATUS_COLORS: Record<ProjectStatus, { bg: string; text: string }> = {
    PUBLISHED: { bg: "rgb(220 252 231)", text: "rgb(22 163 74)" },
    DRAFT: { bg: "rgb(254 249 195)", text: "rgb(161 98 7)" },
    ARCHIVED: { bg: "rgb(244 244 245)", text: "rgb(82 82 91)" },
};

export default function AdminProjectsPage() {
    const router = useRouter();
    const toast = useToast();
    const [projects, setProjects] = useState<ProjectListResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [statusFilter, setFilter] = useState<ProjectStatus | "ALL">("ALL");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [busy, setBusy] = useState<number | null>(null); // id of row being acted on

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ page: page.toString(), size: "12" });
            if (statusFilter !== "ALL") params.set("status", statusFilter);
            const res = await apiClient.get<ApiResponse<ApiPage<ProjectListResponse>>>(
                `/admin/projects?${params}`
            );
            setProjects(res.data.data.content ?? []);
            setTotalPages(res.data.data.totalPages ?? 1);
        } catch {
            setError("Failed to load projects.");
        } finally {
            setLoading(false);
        }
    }, [page, statusFilter]);

    useEffect(() => { fetchProjects(); }, [fetchProjects]);

    const changeStatus = async (id: number, status: ProjectStatus) => {
        if (busy !== null) return;
        setBusy(id);
        try {
            await apiClient.patch(`/admin/projects/${id}/status?status=${status}`);
            toast.success(`Project ${status === 'PUBLISHED' ? 'published' : 'archived'}.`);
            fetchProjects();
        } catch { toast.error('Failed to update status.'); }
        finally { setBusy(null); }
    };

    const deleteProject = async (id: number) => {
        if (busy !== null) return;
        if (!confirm('Delete this project permanently?')) return;
        setBusy(id);
        try {
            await apiClient.delete(`/admin/projects/${id}`);
            toast.success('Project deleted.');
            fetchProjects();
        } catch { toast.error('Failed to delete project.'); }
        finally { setBusy(null); }
    };

    return (
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
                <div>
                    <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "32px", color: "rgb(23 23 23)" }}>Projects</h2>
                    <p style={{ color: "rgb(115 115 115)", fontSize: "14px", marginTop: "4px" }}>Manage all design projects</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/admin/projects/new")}
                    style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px", background: "linear-gradient(to right, #C9A96E, #A8844A)", color: "white", border: "none", borderRadius: "12px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}
                >
                    <Plus style={{ width: "18px", height: "18px" }} /> Add Project
                </motion.button>
            </div>

            {error && (
                <div style={{ padding: "12px 16px", borderRadius: "10px", background: "rgb(254 242 242)", border: "1px solid rgb(254 202 202)", color: "rgb(220 38 38)", fontSize: "14px", marginBottom: "24px" }}>{error}</div>
            )}

            {/* Filter chips */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
                {(["ALL", "PUBLISHED", "DRAFT", "ARCHIVED"] as const).map((s) => (
                    <button
                        key={s}
                        onClick={() => { setFilter(s); setPage(0); }}
                        style={{
                            padding: "8px 18px",
                            borderRadius: "20px",
                            border: "1px solid",
                            borderColor: statusFilter === s ? "#C9A96E" : "rgb(229 229 229)",
                            background: statusFilter === s ? "rgba(201,169,110,0.1)" : "white",
                            color: statusFilter === s ? "#A8844A" : "rgb(115 115 115)",
                            fontSize: "13px",
                            fontWeight: statusFilter === s ? "600" : "400",
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                    >
                        {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
                    </button>
                ))}
                <button onClick={fetchProjects} style={{ marginLeft: "auto", padding: "8px", borderRadius: "20px", border: "1px solid rgb(229 229 229)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "rgb(115 115 115)" }}>
                    <RefreshCw style={{ width: "14px", height: "14px" }} /> Refresh
                </button>
            </div>

            {/* Table */}
            <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.08)", border: "1px solid rgb(245 245 245)", overflow: "hidden" }}>
                {loading ? (
                    <div style={{ padding: "64px 32px", textAlign: "center", color: "rgb(115 115 115)" }}>
                        <RefreshCw style={{ width: "32px", height: "32px", animation: "spin 1s linear infinite", margin: "0 auto 12px", color: "#C9A96E" }} />
                        Loading projects…
                    </div>
                ) : projects.length === 0 ? (
                    <div style={{ padding: "64px 32px", textAlign: "center" }}>
                        <FolderOpen style={{ width: "48px", height: "48px", color: "rgb(212 212 212)", margin: "0 auto 16px" }} />
                        <p style={{ color: "rgb(115 115 115)", fontSize: "15px" }}>No projects found</p>
                        <button onClick={() => router.push("/admin/projects/new")} style={{ marginTop: "16px", padding: "10px 24px", borderRadius: "10px", background: "#C9A96E", color: "white", border: "none", cursor: "pointer", fontSize: "14px" }}>
                            Add first project
                        </button>
                    </div>
                ) : (
                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ background: "rgb(250 250 250)", borderBottom: "1px solid rgb(245 245 245)" }}>
                                    {["Image", "Title", "Category", "Location", "Year", "Status", "Actions"].map((h) => (
                                        <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "rgb(115 115 115)", letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {projects.map((p, i) => {
                                        const sc = STATUS_COLORS[p.status];
                                        return (
                                            <motion.tr
                                                key={p.id}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.04 }}
                                                style={{ borderBottom: "1px solid rgb(250 250 250)" }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = "rgb(250 250 250)"}
                                                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                                            >
                                                <td style={{ padding: "14px 20px" }}>
                                                    {p.imageUrl
                                                        ? <img src={p.imageUrl.startsWith("http") ? p.imageUrl : p.imageUrl.startsWith("/media") ? `http://localhost:8080${p.imageUrl}` : p.imageUrl} alt={p.title} style={{ width: "60px", height: "44px", objectFit: "cover", borderRadius: "8px" }} />
                                                        : <div style={{ width: "60px", height: "44px", borderRadius: "8px", background: "rgb(245 245 245)", display: "flex", alignItems: "center", justifyContent: "center" }}><FolderOpen style={{ width: "20px", height: "20px", color: "rgb(212 212 212)" }} /></div>
                                                    }
                                                </td>
                                                <td style={{ padding: "14px 20px", fontSize: "14px", fontWeight: "500", color: "rgb(23 23 23)", maxWidth: "220px" }}>
                                                    <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
                                                </td>
                                                <td style={{ padding: "14px 20px", fontSize: "13px", color: "rgb(82 82 82)" }}>{p.category}</td>
                                                <td style={{ padding: "14px 20px", fontSize: "13px", color: "rgb(82 82 82)" }}>{p.location}</td>
                                                <td style={{ padding: "14px 20px", fontSize: "13px", color: "rgb(82 82 82)" }}>{p.year}</td>
                                                <td style={{ padding: "14px 20px" }}>
                                                    <span style={{ padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", background: sc.bg, color: sc.text }}>
                                                        {p.status.charAt(0) + p.status.slice(1).toLowerCase()}
                                                    </span>
                                                </td>
                                                <td style={{ padding: "14px 20px" }}>
                                                    <div style={{ display: "flex", gap: "4px" }}>
                                                        {p.status === "PUBLISHED" ? (
                                                            // Published: Show green eye (indicating it's visible)
                                                            <button onClick={() => changeStatus(p.id, "ARCHIVED")} title="Archive (hide from public)" style={{ padding: "6px", borderRadius: "8px", border: "none", background: "transparent", cursor: "pointer", color: "rgb(22 163 74)" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgb(220 252 231)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                                                                <Eye style={{ width: "16px", height: "16px" }} />
                                                            </button>
                                                        ) : p.status === "ARCHIVED" ? (
                                                            // Archived: Show gray eye-off (indicating it's hidden)
                                                            <button onClick={() => changeStatus(p.id, "PUBLISHED")} title="Publish (make visible)" style={{ padding: "6px", borderRadius: "8px", border: "none", background: "transparent", cursor: "pointer", color: "rgb(115 115 115)" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgb(244 244 245)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                                                                <EyeOff style={{ width: "16px", height: "16px" }} />
                                                            </button>
                                                        ) : (
                                                            // Draft: Show publish button
                                                            <button onClick={() => changeStatus(p.id, "PUBLISHED")} title="Publish" style={{ padding: "6px", borderRadius: "8px", border: "none", background: "transparent", cursor: "pointer", color: "rgb(22 163 74)" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgb(220 252 231)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                                                                <Eye style={{ width: "16px", height: "16px" }} />
                                                            </button>
                                                        )}
                                                        <button onClick={() => deleteProject(p.id)} title="Delete" style={{ padding: "6px", borderRadius: "8px", border: "none", background: "transparent", cursor: "pointer", color: "rgb(220 38 38)" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgb(254 242 242)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                                                            <Trash2 style={{ width: "16px", height: "16px" }} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", marginTop: "24px" }}>
                    <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} style={{ padding: "8px 20px", borderRadius: "10px", border: "1px solid rgb(229 229 229)", background: page === 0 ? "rgb(250 250 250)" : "white", cursor: page === 0 ? "not-allowed" : "pointer", fontSize: "14px", color: page === 0 ? "rgb(163 163 163)" : "rgb(23 23 23)" }}>
                        Previous
                    </button>
                    <span style={{ fontSize: "14px", color: "rgb(115 115 115)" }}>Page {page + 1} of {totalPages}</span>
                    <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} style={{ padding: "8px 20px", borderRadius: "10px", border: "1px solid rgb(229 229 229)", background: page === totalPages - 1 ? "rgb(250 250 250)" : "white", cursor: page === totalPages - 1 ? "not-allowed" : "pointer", fontSize: "14px", color: page === totalPages - 1 ? "rgb(163 163 163)" : "rgb(23 23 23)" }}>
                        Next
                    </button>
                </div>
            )}
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}
