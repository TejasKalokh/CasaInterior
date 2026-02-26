"use client";

/**
 * SubmitGuardContext
 *
 * Allows any admin page to register that it has an active form submission
 * in flight. The AdminSidebar reads this flag to intercept navigation and
 * ask the user to confirm before leaving, preventing half-saved wizard states.
 *
 * Usage:
 *   const { setSubmitting } = useSubmitGuard();
 *   setSubmitting(true);   // before await apiClient.post(...)
 *   setSubmitting(false);  // in finally block
 */

import {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
} from "react";

interface SubmitGuardContextValue {
    isSubmitting: boolean;
    setSubmitting: (value: boolean) => void;
}

const SubmitGuardContext = createContext<SubmitGuardContextValue | null>(null);

export function SubmitGuardProvider({ children }: { children: ReactNode }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setSubmitting = useCallback((value: boolean) => {
        setIsSubmitting(value);
    }, []);

    return (
        <SubmitGuardContext.Provider value={{ isSubmitting, setSubmitting }}>
            {children}
        </SubmitGuardContext.Provider>
    );
}

export function useSubmitGuard(): SubmitGuardContextValue {
    const ctx = useContext(SubmitGuardContext);
    if (!ctx) throw new Error("useSubmitGuard must be used inside <SubmitGuardProvider>");
    return ctx;
}
