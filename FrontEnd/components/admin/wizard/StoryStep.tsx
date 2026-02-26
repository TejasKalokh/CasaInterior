"use client";

import { motion } from "framer-motion";
import { ProjectDraft } from "@/lib/adminData";

interface StoryStepProps {
    data: ProjectDraft;
    updateData: (updates: Partial<ProjectDraft>) => void;
}

const textareaStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    border: '1px solid rgb(212 212 212)',
    outline: 'none',
    fontSize: '15px',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    resize: 'vertical' as const,
    minHeight: '150px',
    lineHeight: '1.6'
};

const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: 'rgb(64 64 64)',
    marginBottom: '8px'
};

export default function StoryStep({ data, updateData }: StoryStepProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div style={{ marginBottom: '32px' }}>
                <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '28px',
                    color: 'rgb(23 23 23)',
                    marginBottom: '8px'
                }}>
                    Project Story
                </h3>
                <p style={{ color: 'rgb(82 82 82)', fontSize: '15px' }}>
                    Describe the challenge and your solution
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* The Challenge */}
                <div>
                    <label style={labelStyle}>
                        The Challenge <span style={{ color: 'rgb(220 38 38)' }}>*</span>
                    </label>
                    <textarea
                        value={data.challenge}
                        onChange={(e) => updateData({ challenge: e.target.value })}
                        placeholder="Describe the main challenges faced in this project..."
                        rows={6}
                        style={textareaStyle}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#C9A96E';
                            e.target.style.boxShadow = '0 0 0 3px rgba(201, 169, 110, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgb(212 212 212)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                    <p style={{ fontSize: '12px', color: 'rgb(115 115 115)', marginTop: '8px' }}>
                        Explain what the client needed and what obstacles you encountered
                    </p>
                </div>

                {/* Our Solution */}
                <div>
                    <label style={labelStyle}>
                        Our Solution <span style={{ color: 'rgb(220 38 38)' }}>*</span>
                    </label>
                    <textarea
                        value={data.solution}
                        onChange={(e) => updateData({ solution: e.target.value })}
                        placeholder="Describe how you solved the challenges..."
                        rows={6}
                        style={textareaStyle}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#C9A96E';
                            e.target.style.boxShadow = '0 0 0 3px rgba(201, 169, 110, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgb(212 212 212)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                    <p style={{ fontSize: '12px', color: 'rgb(115 115 115)', marginTop: '8px' }}>
                        Detail your approach, design decisions, and implementation strategy
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
