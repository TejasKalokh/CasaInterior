/**
 * Central Axios client for all API calls.
 *
 * Request interceptor  — attaches JWT from localStorage to every request.
 * Response interceptor — on 401 clears token and hard-navigates to /admin/login.
 *                        Uses window.location.href (NOT router.push) because
 *                        interceptors run outside the React component tree.
 *
 * Timeout: 10 000 ms — prevents UI hanging when backend is unreachable.
 */

import axios from 'axios';
import { getToken, removeToken } from './auth';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
    timeout: 10_000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ─── Request — attach Bearer token ───────────────────────────────────────────

apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ─── Response — handle 401 (token expired / invalid) ─────────────────────────

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            removeToken();
            // Hard redirect — safe from outside component tree
            if (typeof window !== 'undefined') {
                window.location.href = '/admin/login';
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
