"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, MailOpen, Archive, Trash2 } from "lucide-react";
import { Inquiry } from "@/lib/adminData";

interface InquiryDrawerProps {
    inquiry: Inquiry | null;
    onClose: () => void;
    onMarkRead: (id: string) => void;
    onArchive: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function InquiryDrawer({ 
    inquiry, 
    onClose, 
    onMarkRead, 
    onArchive, 
    onDelete 
}: InquiryDrawerProps) {
    if (!inquiry) return null;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <AnimatePresence>
            {inquiry && (
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
                            zIndex: 40
                        }}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        style={{
                            position: 'fixed',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: '100%',
                            maxWidth: '672px',
                            background: 'white',
                            boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
                            zIndex: 50,
                            overflowY: 'auto'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            position: 'sticky',
                            top: 0,
                            background: 'white',
                            borderBottom: '1px solid rgb(229 229 229)',
                            padding: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            zIndex: 10
                        }}>
                            <div>
                                <h2 style={{
                                    fontFamily: 'var(--font-serif)',
                                    fontSize: '24px',
                                    color: 'rgb(23 23 23)'
                                }}>
                                    Inquiry Details
                                </h2>
                                <p style={{
                                    fontSize: '14px',
                                    color: 'rgb(115 115 115)',
                                    marginTop: '4px'
                                }}>
                                    {formatDate(inquiry.date)}
                                </p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'background-color 0.2s',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgb(245 245 245)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <X style={{ width: '24px', height: '24px', color: 'rgb(82 82 82)' }} />
                            </motion.button>
                        </div>

                        {/* Content */}
                        <div style={{ padding: '24px' }}>
                            {/* Contact Info */}
                            <div style={{
                                background: 'rgb(250 250 250)',
                                borderRadius: '16px',
                                padding: '24px',
                                marginBottom: '24px'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    marginBottom: '16px'
                                }}>
                                    <div style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(to bottom right, #C9A96E, #A8844A)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <span style={{
                                            color: 'white',
                                            fontSize: '24px',
                                            fontWeight: '500'
                                        }}>
                                            {inquiry.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 style={{
                                            fontSize: '20px',
                                            fontWeight: '600',
                                            color: 'rgb(23 23 23)'
                                        }}>
                                            {inquiry.name}
                                        </h3>
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '4px 12px',
                                            borderRadius: '9999px',
                                            fontSize: '12px',
                                            fontWeight: '500',
                                            background: 'rgba(201, 169, 110, 0.1)',
                                            color: '#A8844A',
                                            marginTop: '4px'
                                        }}>
                                            {inquiry.projectType}
                                        </span>
                                    </div>
                                </div>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: '16px',
                                    paddingTop: '16px',
                                    borderTop: '1px solid rgb(229 229 229)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '8px',
                                            background: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}>
                                            <Mail style={{ width: '20px', height: '20px', color: 'rgb(82 82 82)' }} />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '12px', color: 'rgb(115 115 115)' }}>Email</p>
                                            <p style={{ fontSize: '14px', color: 'rgb(23 23 23)', marginTop: '2px' }}>
                                                {inquiry.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '8px',
                                            background: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}>
                                            <Phone style={{ width: '20px', height: '20px', color: 'rgb(82 82 82)' }} />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '12px', color: 'rgb(115 115 115)' }}>Phone</p>
                                            <p style={{ fontSize: '14px', color: 'rgb(23 23 23)', marginTop: '2px' }}>
                                                {inquiry.phone}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <div style={{ marginBottom: '24px' }}>
                                <h4 style={{
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: 'rgb(64 64 64)',
                                    marginBottom: '12px'
                                }}>
                                    Message
                                </h4>
                                <div style={{
                                    background: 'white',
                                    border: '1px solid rgb(229 229 229)',
                                    borderRadius: '16px',
                                    padding: '24px'
                                }}>
                                    <p style={{
                                        color: 'rgb(64 64 64)',
                                        lineHeight: '1.7',
                                        whiteSpace: 'pre-wrap'
                                    }}>
                                        {inquiry.message}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div>
                                <h4 style={{
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: 'rgb(64 64 64)',
                                    marginBottom: '12px'
                                }}>
                                    Actions
                                </h4>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {inquiry.status === 'new' && (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => onMarkRead(inquiry.id)}
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                padding: '12px 16px',
                                                borderRadius: '12px',
                                                background: 'rgb(240 253 244)',
                                                color: 'rgb(21 128 61)',
                                                border: 'none',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.2s',
                                                fontSize: '14px',
                                                fontWeight: '500'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgb(220 252 231)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgb(240 253 244)'}
                                        >
                                            <MailOpen style={{ width: '20px', height: '20px' }} />
                                            <span>Mark as Read</span>
                                        </motion.button>
                                    )}

                                    {inquiry.status !== 'archived' && (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => onArchive(inquiry.id)}
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                padding: '12px 16px',
                                                borderRadius: '12px',
                                                background: 'rgb(245 245 245)',
                                                color: 'rgb(64 64 64)',
                                                border: 'none',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.2s',
                                                fontSize: '14px',
                                                fontWeight: '500'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgb(229 229 229)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgb(245 245 245)'}
                                        >
                                            <Archive style={{ width: '20px', height: '20px' }} />
                                            <span>Archive</span>
                                        </motion.button>
                                    )}

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            if (confirm('Are you sure you want to delete this inquiry?')) {
                                                onDelete(inquiry.id);
                                            }
                                        }}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '12px 16px',
                                            borderRadius: '12px',
                                            background: 'rgb(254 242 242)',
                                            color: 'rgb(185 28 28)',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.2s',
                                            fontSize: '14px',
                                            fontWeight: '500'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgb(254 226 226)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgb(254 242 242)'}
                                    >
                                        <Trash2 style={{ width: '20px', height: '20px' }} />
                                        <span>Delete</span>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
