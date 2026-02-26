"use client";

import { ReactNode, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { useAuth } from "@/context/AuthContext";
import { SubmitGuardProvider } from "@/context/SubmitGuardContext";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";
    const [sidebarOpen, setSidebarOpen] = useState(false);

    /* ── Auth guard — skip for login page itself ─────────────────────────── */
    useEffect(() => {
        if (!loading && !user && !isLoginPage) {
            router.replace("/admin/login");
        }
    }, [user, loading, router, isLoginPage]);

    // Close sidebar on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setSidebarOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    /*
     * Return null while auth is resolving (or while redirect is in flight).
     * This completely prevents any HTML flash of the admin UI to
     * unauthenticated users — per user review.
     */
    // On the login page: always render children (the login form)
    if (isLoginPage) return <>{children}</>;

    // On all other admin pages: block until auth resolves
    if (loading || !user) return null;

    return (
        <SubmitGuardProvider>
            <div className="flex h-screen bg-[#FAFAF9] overflow-hidden admin-panel" style={{ cursor: "auto" }}>
                {/* Mobile overlay — closes sidebar when tapped */}
                {sidebarOpen && (
                    <div
                        onClick={() => setSidebarOpen(false)}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.5)",
                            zIndex: 150,
                            cursor: "auto",
                        }}
                    />
                )}

                {/* Sidebar */}
                <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-hidden" style={{ cursor: "auto", minWidth: 0 }}>
                    {/* Topbar */}
                    <AdminTopbar onMenuClick={() => setSidebarOpen((o) => !o)} />

                    {/* Page Content */}
                    <main
                        className="flex-1 overflow-y-auto"
                        style={{ cursor: "auto", overflowX: "hidden" }}
                    >
                        <style>{`
                        .admin-main-content { padding: 32px; }
                        @media (max-width: 768px) { .admin-main-content { padding: 16px; } }
                        @media (max-width: 480px) { .admin-main-content { padding: 12px; } }
                    `}</style>
                        <div className="admin-main-content">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </SubmitGuardProvider>
    );
}
