"use client";

/**
 * Admin — Settings Page (MAIN_ADMIN only)
 * User management: list, create, delete admin accounts.
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, Trash2, X, ShieldCheck, Shield } from "lucide-react";
import apiClient from "@/lib/api";
import type { ApiResponse, AdminUserResponse } from "@/lib/types";
import { useToast } from "@/context/ToastContext";

const BLANK_FORM = { name: "", email: "", password: "", role: "ADMIN" as "ADMIN" | "MAIN_ADMIN" };
const BLANK_ERRORS = { name: "", email: "", password: "" };

function validateField(key: "name" | "email" | "password", value: string): string {
    if (key === "name") {
        if (!value.trim()) return "Full name is required.";
        if (value.trim().length < 2) return "Name must be at least 2 characters.";
        if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) return "Name can only contain letters, spaces, hyphens, or apostrophes.";
    }
    if (key === "email") {
        if (!value.trim()) return "Email address is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Please enter a valid email address.";
    }
    if (key === "password") {
        if (!value) return "Password is required.";
        if (value.length < 8) return "Password must be at least 8 characters.";
        if (!/\d/.test(value)) return "Password must contain at least one number.";
    }
    return "";
}

export default function AdminSettingsPage() {
    const toast = useToast();
    const [users, setUsers] = useState<AdminUserResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<typeof BLANK_FORM>(BLANK_FORM);
    const [errors, setErrors] = useState<typeof BLANK_ERRORS>(BLANK_ERRORS);
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState<number | null>(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await apiClient.get<ApiResponse<{ content: AdminUserResponse[] }>>("/admin/users");
            setUsers(res.data.data?.content ?? []);
        } catch { toast.error("Failed to load users."); }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    const closeForm = () => {
        setShowForm(false);
        setForm(BLANK_FORM);
        setErrors(BLANK_ERRORS);
        setTouched({});
    };

    const createUser = async () => {
        if (saving) return;
        // Validate all fields before submitting
        const nameErr = validateField("name", form.name);
        const emailErr = validateField("email", form.email);
        const passErr = validateField("password", form.password);
        if (nameErr || emailErr || passErr) {
            setErrors({ name: nameErr, email: emailErr, password: passErr });
            setTouched({ name: true, email: true, password: true });
            return;
        }
        setSaving(true);
        try {
            await apiClient.post('/admin/users', form);
            toast.success(`Admin user "${form.name}" created.`);
            closeForm();
            fetchUsers();
        } catch (e: unknown) {
            const ax = e as { response?: { data?: { message?: string } } };
            toast.error(ax?.response?.data?.message || 'Failed to create user.');
        } finally { setSaving(false); }
    };

    const deleteUser = async (id: number) => {
        if (deleting !== null) return;
        if (!confirm('Delete this admin user?')) return;
        setDeleting(id);
        try {
            await apiClient.delete(`/admin/users/${id}`);
            toast.success('User deleted.');
            setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch { toast.error('Failed to delete user.'); }
        finally { setDeleting(null); }
    };

    const f = (k: keyof typeof BLANK_FORM, v: string) => {
        setForm((p) => ({ ...p, [k]: v }));
        // Clear error as user types
        if (k in BLANK_ERRORS) {
            setErrors((p) => ({ ...p, [k]: "" }));
        }
    };
    const blur = (k: "name" | "email" | "password") => {
        setTouched((p) => ({ ...p, [k]: true }));
        setErrors((p) => ({ ...p, [k]: validateField(k, form[k]) }));
    };

    return (
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
                <div>
                    <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "32px", color: "rgb(23 23 23)" }}>Settings</h2>
                    <p style={{ color: "rgb(115 115 115)", fontSize: "14px", marginTop: "4px" }}>Manage admin users</p>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowForm(true)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px", background: "linear-gradient(to right, #C9A96E, #A8844A)", color: "white", border: "none", borderRadius: "12px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                    <Plus style={{ width: "18px", height: "18px" }} /> New Admin User
                </motion.button>
            </div>



            {/* User list */}
            <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.08)", border: "1px solid rgb(245 245 245)", overflow: "hidden" }}>
                {loading ? (
                    <div style={{ padding: "64px 32px", textAlign: "center", color: "rgb(115 115 115)" }}>Loading users…</div>
                ) : users.length === 0 ? (
                    <div style={{ padding: "64px 32px", textAlign: "center" }}>
                        <Users style={{ width: "48px", height: "48px", color: "rgb(212 212 212)", margin: "0 auto 16px" }} />
                        <p style={{ color: "rgb(115 115 115)", fontSize: "15px" }}>No admin users found</p>
                    </div>
                ) : (
                    users.map((u, i) => (
                        <motion.div
                            key={u.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px 24px", borderBottom: i < users.length - 1 ? "1px solid rgb(250 250 250)" : "none" }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "rgb(250 250 250)"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: u.role === "MAIN_ADMIN" ? "linear-gradient(to bottom right, #C9A96E, #A8844A)" : "linear-gradient(to bottom right, rgb(99 102 241), rgb(124 58 237))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                {u.role === "MAIN_ADMIN"
                                    ? <ShieldCheck style={{ width: "22px", height: "22px", color: "white" }} />
                                    : <Shield style={{ width: "22px", height: "22px", color: "white" }} />
                                }
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontSize: "15px", fontWeight: "600", color: "rgb(23 23 23)" }}>{u.name}</p>
                                <p style={{ fontSize: "13px", color: "rgb(115 115 115)", marginTop: "2px" }}>{u.email}</p>
                            </div>
                            <span style={{ padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", background: u.role === "MAIN_ADMIN" ? "rgba(201,169,110,0.1)" : "rgb(238 242 255)", color: u.role === "MAIN_ADMIN" ? "#A8844A" : "rgb(99 102 241)" }}>
                                {u.role === "MAIN_ADMIN" ? "Main Admin" : "Admin"}
                            </span>
                            <p style={{ fontSize: "12px", color: "rgb(163 163 163)", whiteSpace: "nowrap" }}>
                                {new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </p>
                            {u.role !== "MAIN_ADMIN" && (
                                <button onClick={() => deleteUser(u.id)} title="Delete" style={{ padding: "6px", borderRadius: "8px", border: "none", background: "transparent", cursor: "pointer", color: "rgb(220 38 38)", flexShrink: 0 }} onMouseEnter={(e) => e.currentTarget.style.background = "rgb(254 242 242)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                                    <Trash2 style={{ width: "16px", height: "16px" }} />
                                </button>
                            )}
                        </motion.div>
                    ))
                )}
            </div>

            {/* Create user modal */}
            <AnimatePresence>
                {showForm && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={closeForm}
                            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} onClick={(e) => e.stopPropagation()} style={{ width: "min(480px, calc(100vw - 32px))", background: "white", borderRadius: "20px", padding: "32px", boxShadow: "0 40px 80px rgba(0,0,0,0.25)", zIndex: 110 }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", color: "rgb(23 23 23)" }}>Create Admin User</h3>
                                    <button onClick={closeForm} style={{ padding: "8px", borderRadius: "8px", border: "none", background: "transparent", cursor: "pointer" }}><X style={{ width: "20px", height: "20px", color: "rgb(115 115 115)" }} /></button>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                    {(["name", "email", "password"] as const).map((key) => {
                                        const labels: Record<string, string> = { name: "Full Name", email: "Email Address", password: "Password" };
                                        const hints: Record<string, string> = {
                                            name: "Letters, spaces, hyphens and apostrophes only",
                                            email: "e.g. admin@casainterior.com",
                                            password: "Min 8 characters, must include a number",
                                        };
                                        const hasError = !!errors[key];
                                        return (
                                            <div key={key}>
                                                <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: hasError ? "rgb(220 38 38)" : "rgb(82 82 82)", marginBottom: "6px", fontWeight: "600" }}>
                                                    {labels[key]}
                                                </label>
                                                <input
                                                    type={key === "password" ? "password" : key === "email" ? "email" : "text"}
                                                    value={form[key]}
                                                    onChange={(e) => f(key, e.target.value)}
                                                    onBlur={() => blur(key)}
                                                    placeholder={hints[key]}
                                                    style={{
                                                        width: "100%",
                                                        padding: "10px 14px",
                                                        borderRadius: "10px",
                                                        border: hasError ? "1.5px solid rgb(220 38 38)" : "1px solid rgb(229 229 229)",
                                                        fontSize: "14px",
                                                        outline: "none",
                                                        boxSizing: "border-box",
                                                        background: hasError ? "rgb(255 249 249)" : "white",
                                                        transition: "border-color 0.2s",
                                                    }}
                                                />
                                                <AnimatePresence>
                                                    {hasError && (
                                                        <motion.p
                                                            key={errors[key]}
                                                            initial={{ opacity: 0, y: -4 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0 }}
                                                            transition={{ duration: 0.15 }}
                                                            style={{ fontSize: "12px", color: "rgb(220 38 38)", marginTop: "5px", display: "flex", alignItems: "center", gap: "5px" }}
                                                        >
                                                            <span style={{ fontSize: "14px" }}>⚠</span> {errors[key]}
                                                        </motion.p>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                    <div>
                                        <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgb(82 82 82)", marginBottom: "6px", fontWeight: "600" }}>Role</label>
                                        <select value={form.role} onChange={(e) => f("role", e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid rgb(229 229 229)", fontSize: "14px", outline: "none", background: "white" }}>
                                            <option value="ADMIN">Admin</option>
                                            <option value="MAIN_ADMIN">Main Admin</option>
                                        </select>
                                    </div>

                                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={createUser} disabled={saving} aria-busy={saving} style={{ padding: "13px", borderRadius: "10px", background: saving ? "rgb(212 212 212)" : "linear-gradient(135deg, #C9A96E, #A8844A)", color: saving ? "rgb(115 115 115)" : "white", border: "none", fontSize: "14px", fontWeight: "600", cursor: saving ? "not-allowed" : "pointer", marginTop: "8px" }}>
                                        {saving ? "Creating…" : "Create User"}
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
