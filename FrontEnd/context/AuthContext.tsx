'use client';

/**
 * AuthContext — authentication state shared across the admin panel.
 *
 * On mount:
 *  1. Read token from localStorage.
 *  2. Validate expiry (isTokenValid). If expired → removeToken → setLoading(false).
 *  3. If valid → hydrate user from localStorage cache → setLoading(false).
 *
 * This ensures no 401 loops from stale tokens.
 */

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode,
} from 'react';
import apiClient from '@/lib/api';
import {
    getToken,
    setToken,
    removeToken,
    saveUser,
    getSavedUser,
    isTokenValid,
    authResponseToUser,
} from '@/lib/auth';
import type { AuthUser, AuthResponse } from '@/lib/types';

// ─── Context shape ────────────────────────────────────────────────────────────

interface AuthContextValue {
    user: AuthUser | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setTokenState] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Hydrate auth state from localStorage on mount
    useEffect(() => {
        const storedToken = getToken();

        if (storedToken && isTokenValid(storedToken)) {
            const cachedUser = getSavedUser();
            setTokenState(storedToken);
            setUser(cachedUser);
        } else {
            // Token missing or expired — clean up
            removeToken();
        }

        setLoading(false);
    }, []);

    // ── Login ─────────────────────────────────────────────────────────────────
    const login = useCallback(async (email: string, password: string) => {
        const res = await apiClient.post<{ success: boolean; data: AuthResponse }>(
            '/auth/login',
            { email, password }
        );

        const authData = res.data.data;
        const newToken = authData.token;
        const newUser = authResponseToUser(authData);

        setToken(newToken);
        saveUser(newUser);
        setTokenState(newToken);
        setUser(newUser);
    }, []);

    // ── Logout ────────────────────────────────────────────────────────────────
    const logout = useCallback(() => {
        removeToken();
        setTokenState(null);
        setUser(null);
        window.location.href = '/admin/login';
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
}
