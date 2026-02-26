'use client';

/**
 * Admin Login Page — wired to POST /api/auth/login.
 *
 * - Already logged in?  → redirects immediately to /admin
 * - Auth loading?       → shows a bare spinner (prevents flash)
 * - On submit           → calls AuthContext.login() → catches errors inline
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export default function AdminLoginPage() {
    const { login, user, loading } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Redirect if already authenticated
    useEffect(() => {
        if (!loading && user) {
            router.replace('/admin');
        }
    }, [user, loading, router]);

    // Show nothing while auth is resolving to prevent any flash
    if (loading || (!loading && user)) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            await login(email.trim(), password);
            router.replace('/admin');
        } catch (err: unknown) {
            const axiosErr = err as { response?: { status?: number; data?: { message?: string } } };
            if (axiosErr?.response?.status === 401) {
                setError('Invalid email or password.');
            } else if (axiosErr?.response?.data?.message) {
                setError(axiosErr.response.data.message);
            } else {
                setError('Unable to connect to the server. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #171717 0%, #262626 60%, #1a1a1a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
        }}>
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    width: '100%',
                    maxWidth: '420px',
                    background: 'white',
                    borderRadius: '20px',
                    padding: '48px 40px',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
                }}
            >
                {/* Logo */}
                <div style={{ marginBottom: '40px' }}>
                    <div style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '28px',
                        letterSpacing: '0.06em',
                        color: '#171717',
                        lineHeight: 1,
                    }}>
                        CASA
                    </div>
                    <div style={{
                        fontSize: '10px',
                        letterSpacing: '0.4em',
                        textTransform: 'uppercase',
                        color: '#C9A96E',
                        fontWeight: 500,
                        marginTop: '4px',
                    }}>
                        Interior Admin
                    </div>
                    <p style={{
                        fontSize: '14px',
                        color: 'rgb(115 115 115)',
                        marginTop: '16px',
                    }}>
                        Sign in to manage your studio.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Email */}
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '11px',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'rgb(82 82 82)',
                            marginBottom: '8px',
                            fontWeight: 500,
                        }}>
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@casainterior.in"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '10px',
                                border: '1px solid rgb(212 212 212)',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'border-color 0.2s, box-shadow 0.2s',
                                boxSizing: 'border-box',
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#C9A96E';
                                e.target.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgb(212 212 212)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '11px',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'rgb(82 82 82)',
                            marginBottom: '8px',
                            fontWeight: 500,
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '10px',
                                border: '1px solid rgb(212 212 212)',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'border-color 0.2s, box-shadow 0.2s',
                                boxSizing: 'border-box',
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#C9A96E';
                                e.target.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgb(212 212 212)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    {/* Inline error */}
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                fontSize: '13px',
                                color: 'rgb(220 38 38)',
                                background: 'rgb(254 242 242)',
                                border: '1px solid rgb(254 202 202)',
                                borderRadius: '8px',
                                padding: '10px 14px',
                            }}
                        >
                            {error}
                        </motion.p>
                    )}

                    {/* Submit */}
                    <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={!submitting ? { scale: 1.01 } : {}}
                        whileTap={!submitting ? { scale: 0.99 } : {}}
                        style={{
                            width: '100%',
                            padding: '13px',
                            borderRadius: '10px',
                            background: submitting
                                ? 'rgb(212 212 212)'
                                : 'linear-gradient(135deg, #C9A96E, #A8844A)',
                            color: submitting ? 'rgb(115 115 115)' : 'white',
                            border: 'none',
                            fontSize: '14px',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            cursor: submitting ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                        }}
                    >
                        {submitting ? (
                            <>
                                <span style={{
                                    width: '14px',
                                    height: '14px',
                                    border: '2px solid rgba(115,115,115,0.3)',
                                    borderTopColor: 'rgb(115 115 115)',
                                    borderRadius: '50%',
                                    animation: 'spin 0.7s linear infinite',
                                    display: 'inline-block',
                                }} />
                                Signing in…
                            </>
                        ) : 'Sign In'}
                    </motion.button>
                </form>

                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </motion.div>
        </div>
    );
}
