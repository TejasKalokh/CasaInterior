"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FolderOpen, Inbox, ArrowUpRight, Plus, Eye, Star } from "lucide-react";
import apiClient from "@/lib/api";
import type { DashboardStatsResponse, ActivityResponse, ApiResponse } from "@/lib/types";

// ─── Skeleton component ───────────────────────────────────────────────────────

function Skeleton({ h, w }: { h: string; w?: string }) {
    return (
        <div style={{
            height: h,
            width: w || "100%",
            borderRadius: "8px",
            background: "linear-gradient(90deg, #f3f3f3 25%, #e8e8e8 50%, #f3f3f3 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
        }} />
    );
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStatsResponse | null>(null);
    const [activity, setActivity] = useState<ActivityResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboard = async () => {
            setLoading(true);
            setError("");
            try {
                const [statsRes, activityRes] = await Promise.all([
                    apiClient.get<ApiResponse<DashboardStatsResponse>>("/admin/dashboard/stats"),
                    apiClient.get<ApiResponse<ActivityResponse[]>>("/admin/dashboard/activity"),
                ]);
                setStats(statsRes.data.data);
                setActivity(activityRes.data.data ?? []);
            } catch {
                setError("Failed to load dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    const statCards = stats ? [
        {
            icon: FolderOpen,
            label: "Total Projects",
            value: stats.totalProjects.toString(),
            sub: `${stats.publishedProjects} published`,
            color: "from-indigo-500 to-purple-600",
        },
        {
            icon: Inbox,
            label: "New Inquiries",
            value: stats.newInquiries.toString(),
            sub: `${stats.totalInquiries} total`,
            color: "from-emerald-500 to-teal-600",
        },
        {
            icon: Star,
            label: "Active Reviews",
            value: stats.activeReviews.toString(),
            sub: `${stats.totalReviews} total`,
            color: "from-amber-500 to-orange-600",
        },
    ] : [];

    return (
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
            <style>{`
                @keyframes shimmer {
                    0%   { background-position: -200% 0; }
                    100% { background-position:  200% 0; }
                }
            `}</style>

            {error && (
                <div style={{
                    padding: "16px 20px",
                    borderRadius: "12px",
                    background: "rgb(254 242 242)",
                    border: "1px solid rgb(254 202 202)",
                    color: "rgb(220 38 38)",
                    fontSize: "14px",
                    marginBottom: "24px",
                }}>
                    {error}
                </div>
            )}

            {/* Stats Grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
                marginBottom: "32px",
            }}>
                {loading
                    ? Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} style={{ background: "white", borderRadius: "16px", padding: "24px", border: "1px solid rgb(245 245 245)", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)" }}>
                            <Skeleton h="56px" w="56px" />
                            <div style={{ marginTop: "24px" }}>
                                <Skeleton h="14px" w="60%" />
                                <div style={{ marginTop: "12px" }}><Skeleton h="36px" w="40%" /></div>
                                <div style={{ marginTop: "10px" }}><Skeleton h="12px" w="50%" /></div>
                            </div>
                        </div>
                    ))
                    : statCards.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 }}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                style={{
                                    background: "white",
                                    borderRadius: "16px",
                                    padding: "24px",
                                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                                    border: "1px solid rgb(245 245 245)",
                                    cursor: "pointer",
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                <div style={{ position: "relative", zIndex: 1 }}>
                                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
                                        <div style={{
                                            width: "56px",
                                            height: "56px",
                                            borderRadius: "16px",
                                            background: stat.color.includes("indigo")
                                                ? "linear-gradient(to bottom right, rgb(99 102 241), rgb(124 58 237))"
                                                : stat.color.includes("emerald")
                                                    ? "linear-gradient(to bottom right, rgb(16 185 129), rgb(5 150 105))"
                                                    : "linear-gradient(to bottom right, rgb(245 158 11), rgb(234 88 12))",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                                        }}>
                                            <Icon style={{ width: "28px", height: "28px", color: "white" }} />
                                        </div>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: "14px", fontWeight: "500", color: "rgb(115 115 115)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                                            {stat.label}
                                        </p>
                                        <p style={{ fontSize: "36px", fontWeight: "700", color: "rgb(23 23 23)", marginBottom: "8px" }}>
                                            {stat.value}
                                        </p>
                                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "rgb(163 163 163)" }}>
                                            <ArrowUpRight style={{ width: "14px", height: "14px" }} />
                                            <span>{stat.sub}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                }
            </div>

            {/* Quick Actions */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px",
                marginBottom: "32px",
            }}>
                <motion.a
                    href="/admin/projects/new"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ background: "white", borderRadius: "16px", padding: "32px", boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)", color: "black", textDecoration: "none", display: "block", cursor: "pointer" }}
                >
                    <div style={{ width: "64px", height: "64px", background: "linear-gradient(to bottom right, #eaea8eff, #b1ba38ff)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                        <Plus style={{ width: "32px", height: "32px" }} />
                    </div>
                    <h3 style={{ fontSize: "24px", fontFamily: "var(--font-serif)", fontWeight: "700", marginBottom: "12px" }}>Add New Project</h3>
                    <p style={{ color: "rgb(82 82 82)", fontSize: "16px", lineHeight: "1.6", marginBottom: "24px" }}>Create a new interior design project with our step-by-step wizard</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "500", color: "#b1ba38" }}>
                        <span>Get Started</span>
                        <ArrowUpRight style={{ width: "16px", height: "16px" }} />
                    </div>
                </motion.a>

                <motion.a
                    href="/admin/inquiries"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ background: "white", borderRadius: "16px", padding: "32px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)", border: "1px solid rgb(229 229 229)", textDecoration: "none", display: "block", cursor: "pointer" }}
                >
                    <div style={{ width: "64px", height: "64px", background: "linear-gradient(to bottom right, #C9A96E, #A8844A)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}>
                        <Eye style={{ width: "32px", height: "32px", color: "white" }} />
                    </div>
                    <h3 style={{ fontSize: "24px", fontFamily: "var(--font-serif)", fontWeight: "700", color: "rgb(23 23 23)", marginBottom: "12px" }}>View Inquiries</h3>
                    <p style={{ color: "rgb(82 82 82)", fontSize: "16px", lineHeight: "1.6", marginBottom: "24px" }}>Manage and respond to client inquiries and project requests</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "500", color: "#C9A96E" }}>
                        <span>View All</span>
                        <ArrowUpRight style={{ width: "16px", height: "16px" }} />
                    </div>
                </motion.a>
            </div>

            {/* Recent Activity */}
            <div style={{ background: "white", borderRadius: "16px", padding: "32px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)", border: "1px solid rgb(245 245 245)" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", color: "rgb(23 23 23)", marginBottom: "24px" }}>
                    Recent Activity
                </h3>

                {loading ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", borderRadius: "12px", background: "rgb(250 250 250)" }}>
                                <Skeleton h="48px" w="48px" />
                                <div style={{ flex: 1 }}>
                                    <Skeleton h="14px" w="60%" />
                                    <div style={{ marginTop: "6px" }}><Skeleton h="12px" w="40%" /></div>
                                </div>
                                <Skeleton h="12px" w="60px" />
                            </div>
                        ))}
                    </div>
                ) : activity.length === 0 ? (
                    <p style={{ color: "rgb(115 115 115)", fontSize: "14px", textAlign: "center", padding: "32px 0" }}>No recent activity.</p>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {activity.map((act) => (
                            <div
                                key={act.id}
                                style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", borderRadius: "12px", transition: "background-color 0.2s", cursor: "default" }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgb(250 250 250)"}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                            >
                                <div style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "12px",
                                    background: act.type === "INQUIRY" ? "rgb(219 234 254)" : "rgb(220 252 231)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                }}>
                                    {act.type === "INQUIRY"
                                        ? <Inbox style={{ width: "24px", height: "24px", color: "rgb(37 99 235)" }} />
                                        : <FolderOpen style={{ width: "24px", height: "24px", color: "rgb(22 163 74)" }} />
                                    }
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontSize: "14px", fontWeight: "500", color: "rgb(23 23 23)" }}>{act.message}</p>
                                    <p style={{ fontSize: "12px", color: "rgb(163 163 163)", marginTop: "4px" }}>
                                        {new Date(act.createdAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
