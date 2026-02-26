"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { LogOut, Bell, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/lib/api";

function formatRelativeTime(iso: string): string {
    const utc = iso.endsWith("Z") || iso.includes("+") ? iso : iso + "Z"; // treat bare LocalDateTime as UTC
    const diff = Date.now() - new Date(utc).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
    const days = Math.floor(hrs / 24);
    return `${days} day${days === 1 ? "" : "s"} ago`;
}

const pageTitles: Record<string, string> = {
    "/admin": "Dashboard",
    "/admin/projects": "Projects",
    "/admin/projects/new": "Add Project",
    "/admin/inquiries": "Inquiries",
    "/admin/settings": "Settings",
    "/admin/reviews": "Reviews",
};

const pageDescriptions: Record<string, string> = {
    "/admin": "Overview of your projects and activities",
    "/admin/projects": "Manage all your design projects",
    "/admin/projects/new": "Create a new interior design project",
    "/admin/inquiries": "Manage client inquiries and messages",
    "/admin/settings": "Configure your preferences",
    "/admin/reviews": "Manage testimonials and client feedback",
};

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: "inquiry" | "project" | "system";
}

interface AdminTopbarProps {
    onMenuClick: () => void;
}

export default function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const pageTitle = pageTitles[pathname] || "Admin";
    const pageDescription = pageDescriptions[pathname] || "";
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [notifLoading, setNotifLoading] = useState(false);

    const fetchNotifications = useCallback(async () => {
        setNotifLoading(true);
        try {
            const [inqRes, actRes] = await Promise.allSettled([
                apiClient.get<{ success: boolean; data: { content: Array<{ id: number; name: string; projectType: string; createdAt: string }> } }>("/admin/inquiries?status=NEW&size=5"),
                apiClient.get<{ success: boolean; data: Array<{ id: number; type: string; message: string; createdAt: string }> }>("/admin/dashboard/activity"),
            ]);

            const result: Notification[] = [];

            if (inqRes.status === "fulfilled") {
                (inqRes.value.data.data?.content ?? []).forEach((inq) => {
                    result.push({
                        id: `inq-${inq.id}`,
                        title: "New Inquiry",
                        message: `${inq.name} sent an inquiry${inq.projectType ? ` about ${inq.projectType}` : ""}`,
                        time: formatRelativeTime(inq.createdAt),
                        read: false,
                        type: "inquiry",
                    });
                });
            }

            if (actRes.status === "fulfilled") {
                (actRes.value.data.data ?? []).slice(0, 5).forEach((act) => {
                    const t = act.type?.toLowerCase();
                    result.push({
                        id: `act-${act.id}`,
                        title: act.type?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ?? "Activity",
                        message: act.message,
                        time: formatRelativeTime(act.createdAt),
                        read: true,
                        type: t === "inquiry" ? "inquiry" : t === "project" ? "project" : "system",
                    });
                });
            }

            setNotifications(result);
        } catch { /* silent fail — bell just shows empty */ }
        finally { setNotifLoading(false); }
    }, []);

    // Fetch once on mount and whenever the dropdown opens
    useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAsRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
    const markAllAsRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    const deleteNotification = (id: string) => setNotifications((prev) => prev.filter((n) => n.id !== id));

    const handleBellClick = () => {
        const next = !showNotifications;
        setShowNotifications(next);
        if (next) fetchNotifications(); // refresh on open
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "inquiry": return "📧";
            case "project": return "📁";
            case "system": return "⚙️";
            default: return "🔔";
        }
    };

    return (
        <>
            <style>{`
                .admin-topbar { height: 80px; padding: 0 32px; }
                .admin-topbar-title { font-size: 28px; }
                .admin-topbar-desc { display: block; }
                .admin-topbar-user-text { display: block; }
                .admin-topbar-hamburger { display: none; }
                @media (max-width: 1023px) {
                    .admin-topbar-hamburger { display: flex; }
                }
                @media (max-width: 768px) {
                    .admin-topbar { height: 64px; padding: 0 16px; }
                    .admin-topbar-title { font-size: 22px; }
                    .admin-topbar-desc { display: none; }
                    .admin-topbar-user-text { display: none; }
                }
                @media (max-width: 480px) {
                    .admin-topbar { padding: 0 12px; }
                    .admin-topbar-title { font-size: 20px; }
                }
            `}</style>

            <header
                className="admin-topbar"
                style={{
                    background: "white",
                    borderBottom: "1px solid rgb(229 229 229)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                    flexShrink: 0,
                }}
            >
                {/* Left side: hamburger + title */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                    {/* Hamburger — mobile/tablet only */}
                    <motion.button
                        className="admin-topbar-hamburger"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onMenuClick}
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "8px",
                            borderRadius: "10px",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            flexShrink: 0,
                        }}
                        title="Open menu"
                    >
                        <Menu style={{ width: "22px", height: "22px", color: "rgb(82 82 82)" }} />
                    </motion.button>

                    {/* Page title block */}
                    <motion.div
                        key={pageTitle}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ minWidth: 0 }}
                    >
                        <h1
                            className="admin-topbar-title"
                            style={{
                                fontFamily: "var(--font-serif)",
                                color: "rgb(23 23 23)",
                                lineHeight: "1",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {pageTitle}
                        </h1>
                        <p
                            className="admin-topbar-desc"
                            style={{ fontSize: "13px", color: "rgb(115 115 115)", marginTop: "4px" }}
                        >
                            {pageDescription}
                        </p>
                    </motion.div>
                </div>

                {/* Right side */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                    {/* Notifications */}
                    <div style={{ position: "relative" }}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleBellClick}
                            style={{
                                position: "relative",
                                padding: "10px",
                                borderRadius: "10px",
                                background: showNotifications ? "rgb(245 245 245)" : "transparent",
                                border: "none",
                                cursor: "pointer",
                                transition: "background-color 0.2s",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onMouseEnter={(e) => !showNotifications && (e.currentTarget.style.background = "rgb(245 245 245)")}
                            onMouseLeave={(e) => !showNotifications && (e.currentTarget.style.background = "transparent")}
                            title="Notifications"
                        >
                            <Bell style={{ width: "20px", height: "20px", color: "rgb(82 82 82)" }} />
                            {unreadCount > 0 && (
                                <span style={{
                                    position: "absolute",
                                    top: "6px",
                                    right: "6px",
                                    minWidth: "17px",
                                    height: "17px",
                                    background: "#C9A96E",
                                    borderRadius: "9px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "10px",
                                    fontWeight: "600",
                                    color: "white",
                                    padding: "0 3px",
                                }}>
                                    {unreadCount}
                                </span>
                            )}
                        </motion.button>

                        {/* Notification Dropdown */}
                        <AnimatePresence>
                            {showNotifications && (
                                <>
                                    <div
                                        onClick={() => setShowNotifications(false)}
                                        style={{ position: "fixed", inset: 0, zIndex: 40 }}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            position: "absolute",
                                            top: "calc(100% + 8px)",
                                            right: 0,
                                            width: "min(400px, calc(100vw - 24px))",
                                            maxHeight: "520px",
                                            background: "white",
                                            borderRadius: "16px",
                                            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                                            border: "1px solid rgb(229 229 229)",
                                            zIndex: 50,
                                            overflow: "hidden",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        {/* Header */}
                                        <div style={{ padding: "14px 18px", borderBottom: "1px solid rgb(229 229 229)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
                                            <h3 style={{ fontSize: "15px", fontWeight: "600", color: "rgb(23 23 23)" }}>Notifications</h3>
                                            {unreadCount > 0 && (
                                                <button
                                                    onClick={markAllAsRead}
                                                    style={{ fontSize: "12px", color: "#C9A96E", background: "none", border: "none", cursor: "pointer", fontWeight: "500", padding: "4px 8px", borderRadius: "6px" }}
                                                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(201, 169, 110, 0.1)"}
                                                    onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                                                >
                                                    Mark all read
                                                </button>
                                            )}
                                        </div>

                                        {/* List */}
                                        <div style={{ flex: 1, overflowY: "auto" }}>
                                            {notifLoading ? (
                                                <div style={{ padding: "40px 20px", textAlign: "center", color: "rgb(163 163 163)", fontSize: "13px" }}>Loading…</div>
                                            ) : notifications.length === 0 ? (
                                                <div style={{ padding: "40px 20px", textAlign: "center" }}>
                                                    <Bell style={{ width: "40px", height: "40px", color: "rgb(212 212 212)", margin: "0 auto 12px" }} />
                                                    <p style={{ color: "rgb(115 115 115)", fontSize: "14px" }}>No new notifications</p>
                                                </div>
                                            ) : (
                                                notifications.map((notification) => (
                                                    <motion.div
                                                        key={notification.id}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        style={{
                                                            padding: "14px 18px",
                                                            borderBottom: "1px solid rgb(245 245 245)",
                                                            background: notification.read ? "white" : "rgb(250 250 250)",
                                                            cursor: "pointer",
                                                            transition: "background-color 0.2s",
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.background = "rgb(245 245 245)"}
                                                        onMouseLeave={(e) => e.currentTarget.style.background = notification.read ? "white" : "rgb(250 250 250)"}
                                                        onClick={() => markAsRead(notification.id)}
                                                    >
                                                        <div style={{ display: "flex", gap: "12px" }}>
                                                            <div style={{ fontSize: "20px", flexShrink: 0 }}>{getNotificationIcon(notification.type)}</div>
                                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px", marginBottom: "3px" }}>
                                                                    <h4 style={{ fontSize: "13px", fontWeight: notification.read ? "500" : "600", color: "rgb(23 23 23)", lineHeight: "1.4" }}>
                                                                        {notification.title}
                                                                    </h4>
                                                                    {!notification.read && (
                                                                        <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#C9A96E", flexShrink: 0, marginTop: "4px" }} />
                                                                    )}
                                                                </div>
                                                                <p style={{ fontSize: "12px", color: "rgb(115 115 115)", lineHeight: "1.5", marginBottom: "4px" }}>{notification.message}</p>
                                                                <p style={{ fontSize: "11px", color: "rgb(163 163 163)" }}>{notification.time}</p>
                                                            </div>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id); }}
                                                                style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", borderRadius: "6px", flexShrink: 0, opacity: 0.5 }}
                                                                onMouseEnter={(e) => { e.currentTarget.style.background = "rgb(254 242 242)"; e.currentTarget.style.opacity = "1"; }}
                                                                onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.opacity = "0.5"; }}
                                                            >
                                                                <X style={{ width: "14px", height: "14px", color: "rgb(115 115 115)" }} />
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                ))
                                            )}
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* User Avatar + name (name hidden on small screens via CSS) */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingLeft: "12px", borderLeft: "1px solid rgb(229 229 229)" }}>
                        <div className="admin-topbar-user-text" style={{ textAlign: "right" }}>
                            <p style={{ fontSize: "13px", fontWeight: "500", color: "rgb(23 23 23)", lineHeight: "1.2" }}>{user?.name || "Admin"}</p>
                            <p style={{ fontSize: "11px", color: "rgb(115 115 115)", marginTop: "3px" }}>{user?.email || ""}</p>
                        </div>
                        <div style={{
                            width: "40px", height: "40px", borderRadius: "10px",
                            background: "linear-gradient(to bottom right, #C9A96E, #A8844A)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0,
                        }}>
                            <span style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>
                                {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
                            </span>
                        </div>
                    </div>

                    {/* Logout */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={logout}
                        style={{ padding: "10px", borderRadius: "10px", background: "transparent", border: "none", cursor: "pointer", transition: "all 0.2s", color: "rgb(82 82 82)", display: "flex", alignItems: "center", justifyContent: "center" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgb(254 242 242)"; e.currentTarget.style.color = "rgb(220 38 38)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgb(82 82 82)"; }}
                        title="Logout"
                    >
                        <LogOut style={{ width: "18px", height: "18px" }} />
                    </motion.button>
                </div>
            </header>
        </>
    );
}
