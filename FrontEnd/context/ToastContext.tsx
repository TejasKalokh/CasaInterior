/**
 * Centralised toast context — wraps all admin pages via the root layout.
 *
 * Usage anywhere inside the app:
 *   const toast = useToast();
 *   toast.success("Project published");
 *   toast.error("Upload failed");
 *   toast.info("Saving draft…");
 */

"use client";

import {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
    ReactElement,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ToastKind = "success" | "error" | "info";

interface Toast {
    id: number;
    message: string;
    kind: ToastKind;
}

interface ToastApi {
    success: (msg: string) => void;
    error: (msg: string) => void;
    info: (msg: string) => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastApi | null>(null);

export function useToast(): ToastApi {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
    return ctx;
}

// ─── Styles per kind ─────────────────────────────────────────────────────────

const STYLE: Record<ToastKind, { bg: string; border: string; icon: ReactElement }> = {
    success: {
        bg: "rgb(240 253 244)",
        border: "rgb(187 247 208)",
        icon: <CheckCircle style={{ width: 18, height: 18, color: "rgb(22 163 74)", flexShrink: 0 }} />,
    },
    error: {
        bg: "rgb(254 242 242)",
        border: "rgb(254 202 202)",
        icon: <XCircle style={{ width: 18, height: 18, color: "rgb(220 38 38)", flexShrink: 0 }} />,
    },
    info: {
        bg: "rgb(239 246 255)",
        border: "rgb(191 219 254)",
        icon: <Info style={{ width: 18, height: 18, color: "rgb(37 99 235)", flexShrink: 0 }} />,
    },
};

// ─── Provider + Renderer ─────────────────────────────────────────────────────

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const push = useCallback((message: string, kind: ToastKind) => {
        const id = ++nextId;
        setToasts((prev) => [...prev, { id, message, kind }]);
        // Auto-dismiss after 4 s
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    }, []);

    const dismiss = (id: number) =>
        setToasts((prev) => prev.filter((t) => t.id !== id));

    const api: ToastApi = {
        success: (msg) => push(msg, "success"),
        error: (msg) => push(msg, "error"),
        info: (msg) => push(msg, "info"),
    };

    return (
        <ToastContext.Provider value={api}>
            {children}

            {/* Toast stack — bottom-right, above everything */}
            <div style={{
                position: "fixed",
                bottom: "24px",
                right: "24px",
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                maxWidth: "360px",
                width: "calc(100vw - 48px)",
            }}>
                <AnimatePresence>
                    {toasts.map((t) => {
                        const s = STYLE[t.kind];
                        return (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 40, scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "10px",
                                    padding: "14px 16px",
                                    borderRadius: "12px",
                                    background: s.bg,
                                    border: `1px solid ${s.border}`,
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                                    fontSize: "14px",
                                    color: "rgb(23 23 23)",
                                    lineHeight: "1.4",
                                }}
                            >
                                {s.icon}
                                <span style={{ flex: 1 }}>{t.message}</span>
                                <button
                                    onClick={() => dismiss(t.id)}
                                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer", flexShrink: 0, opacity: 0.5 }}
                                >
                                    <X style={{ width: 15, height: 15, color: "rgb(82 82 82)" }} />
                                </button>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}
