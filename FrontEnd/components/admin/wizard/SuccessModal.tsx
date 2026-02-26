"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 50
                        }}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 50,
                            pointerEvents: 'none'
                        }}
                    >
                        <div style={{
                            background: 'white',
                            borderRadius: '24px',
                            padding: '48px',
                            boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
                            maxWidth: '448px',
                            pointerEvents: 'auto',
                            textAlign: 'center'
                        }}>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    margin: '0 auto 24px',
                                    borderRadius: '50%',
                                    background: 'rgb(220 252 231)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <CheckCircle2 style={{ width: '48px', height: '48px', color: 'rgb(22 163 74)' }} />
                            </motion.div>
                            
                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                style={{
                                    fontFamily: 'var(--font-serif)',
                                    fontSize: '32px',
                                    color: 'rgb(23 23 23)',
                                    marginBottom: '12px'
                                }}
                            >
                                Project Published!
                            </motion.h3>
                            
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                style={{
                                    color: 'rgb(82 82 82)',
                                    marginBottom: '24px',
                                    lineHeight: '1.6'
                                }}
                            >
                                Your project has been successfully published and is now live on the website.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                style={{
                                    display: 'flex',
                                    gap: '12px',
                                    justifyContent: 'center'
                                }}
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onClose}
                                    style={{
                                        padding: '12px 24px',
                                        borderRadius: '12px',
                                        background: '#C9A96E',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s',
                                        fontSize: '15px',
                                        fontWeight: '500'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#A8844A'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = '#C9A96E'}
                                >
                                    Add Another Project
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
