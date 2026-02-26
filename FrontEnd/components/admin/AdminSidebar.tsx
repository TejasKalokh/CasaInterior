"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, Plus, Inbox, Star, Settings, FolderOpen } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useSubmitGuard } from "@/context/SubmitGuardContext";
import { useRouter } from "next/navigation";

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: FolderOpen, label: "Projects", href: "/admin/projects" },
    { icon: Plus, label: "Add Project", href: "/admin/projects/new" },
    { icon: Inbox, label: "Inquiries", href: "/admin/inquiries" },
    { icon: Star, label: "Reviews", href: "/admin/reviews" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
];

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const pathname = usePathname();
    const { user } = useAuth();
    const { isSubmitting } = useSubmitGuard();
    const router = useRouter();

    /** Intercept nav when a form submit is in flight */
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (isSubmitting) {
            e.preventDefault();
            const ok = confirm("A save is in progress. Leave anyway? Unsaved changes may be lost.");
            if (ok) {
                onClose();
                router.push(href);
            }
            return;
        }
        onClose();
    };

    // Settings is visible to MAIN_ADMIN only — role from JWT via AuthContext
    const visibleNavItems = navItems.filter((item) => {
        if (item.href === "/admin/settings") return user?.role === "MAIN_ADMIN";
        return true;
    });

    return (
        <>
            {/* Responsive sidebar styles */}
            <style>{`
                .admin-sidebar {
                    width: 280px;
                    position: relative;
                    flex-shrink: 0;
                    z-index: 160;
                    display: flex;
                    flex-direction: column;
                    background: linear-gradient(to bottom, rgb(23 23 23), rgb(23 23 23), rgb(38 38 38));
                    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
                    transition: transform 0.3s ease;
                }

                /* On tablet/mobile: fixed drawer that slides in/out */
                @media (max-width: 1023px) {
                    .admin-sidebar {
                        position: fixed;
                        top: 0;
                        left: 0;
                        height: 100vh;
                        transform: translateX(-100%);
                    }
                    .admin-sidebar.sidebar-open {
                        transform: translateX(0);
                    }
                }
            `}</style>

            <aside className={`admin-sidebar${isOpen ? " sidebar-open" : ""}`}>
                {/* Logo */}
                <div style={{
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 28px",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    flexShrink: 0,
                }}>
                    <div>
                        <div style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "26px",
                            letterSpacing: "0.05em",
                            color: "white",
                            lineHeight: "1",
                        }}>
                            CASA
                        </div>
                        <div style={{
                            fontSize: "10px",
                            letterSpacing: "0.4em",
                            textTransform: "uppercase",
                            color: "#C9A96E",
                            fontWeight: "500",
                            marginTop: "4px",
                        }}>
                            Interior Admin
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav style={{
                    flex: 1,
                    padding: "24px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    overflowY: "auto",
                }}>
                    {visibleNavItems.map((item) => {
                        const isLeaf = visibleNavItems.some(
                            (other) => other.href !== item.href && other.href.startsWith(item.href + "/")
                        );
                        const isActive = pathname === item.href ||
                            (!isLeaf && item.href !== "/admin" && pathname.startsWith(item.href + "/"));
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{ textDecoration: "none" }}
                                onClick={(e) => handleNavClick(e, item.href)}
                            >
                                <motion.div
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "14px",
                                        padding: "13px 18px",
                                        borderRadius: "12px",
                                        background: isActive ? "#C9A96E" : "transparent",
                                        color: isActive ? "white" : "rgb(163 163 163)",
                                        transition: "all 0.3s",
                                        cursor: "pointer",
                                        boxShadow: isActive ? "0 10px 15px -3px rgba(201, 169, 110, 0.2)" : "none",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                                            e.currentTarget.style.color = "white";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.color = "rgb(163 163 163)";
                                        }
                                    }}
                                >
                                    {isActive && (
                                        <div style={{
                                            position: "absolute",
                                            left: 0,
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            width: "4px",
                                            height: "28px",
                                            background: "white",
                                            borderRadius: "0 4px 4px 0",
                                        }} />
                                    )}
                                    <Icon style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                                    <span style={{ fontSize: "15px", fontWeight: "500" }}>{item.label}</span>
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer — show logged-in user */}
                <div style={{
                    padding: "20px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                    flexShrink: 0,
                }}>
                    {user && (
                        <div style={{ marginBottom: "8px" }}>
                            <p style={{ fontSize: "13px", color: "white", fontWeight: 500 }}>{user.name}</p>
                            <p style={{ fontSize: "11px", color: "rgb(115 115 115)", marginTop: "2px" }}>
                                {user.role === "MAIN_ADMIN" ? "Main Admin" : "Admin"}
                            </p>
                        </div>
                    )}
                    <div style={{
                        fontSize: "12px",
                        color: "rgb(115 115 115)",
                    }}>
                        Casa Interior © {new Date().getFullYear()}
                    </div>
                </div>
            </aside>
        </>
    );
}
