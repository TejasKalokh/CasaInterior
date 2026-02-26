/**
 * Token helpers — localStorage utilities and JWT decode/validation.
 * These are plain functions, safe to call outside React components.
 */

import { jwtDecode } from 'jwt-decode';
import type { DecodedToken, AuthUser, AuthResponse } from './types';

const TOKEN_KEY = 'casa_admin_token';
const USER_KEY = 'casa_admin_user';

// ─── Token Persistence ────────────────────────────────────────────────────────

export function getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

// ─── User Persistence ─────────────────────────────────────────────────────────

export function saveUser(user: AuthUser): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getSavedUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw) as AuthUser; } catch { return null; }
}

// ─── JWT Decode & Validation ──────────────────────────────────────────────────

export function decodeToken(token: string): DecodedToken | null {
    try { return jwtDecode<DecodedToken>(token); } catch { return null; }
}

/**
 * Returns true if token exists AND has not expired.
 * Adds a 30-second buffer to account for clock skew.
 */
export function isTokenValid(token: string): boolean {
    const decoded = decodeToken(token);
    if (!decoded) return false;
    const nowSec = Math.floor(Date.now() / 1000);
    return decoded.exp > nowSec + 30;
}

// ─── Convenience ──────────────────────────────────────────────────────────────

/** Builds an AuthUser from the login response payload. */
export function authResponseToUser(res: AuthResponse): AuthUser {
    return {
        adminId: res.adminId,
        name: res.name,
        email: res.email,
        role: res.role,
    };
}
