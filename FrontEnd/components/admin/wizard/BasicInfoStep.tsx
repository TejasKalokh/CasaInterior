"use client";

import { motion } from "framer-motion";
import { ProjectDraft } from "@/lib/adminData";

interface BasicInfoStepProps {
    data: ProjectDraft;
    updateData: (updates: Partial<ProjectDraft>) => void;
}

const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    border: '1px solid rgb(212 212 212)',
    outline: 'none',
    fontSize: '15px',
    transition: 'all 0.2s',
    fontFamily: 'inherit'
};

const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: 'rgb(64 64 64)',
    marginBottom: '8px'
};

export default function BasicInfoStep({ data, updateData }: BasicInfoStepProps) {
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
                    Basic Information
                </h3>
                <p style={{ color: 'rgb(82 82 82)', fontSize: '15px' }}>
                    Tell us about the project fundamentals
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                {/* Project Title */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>
                        Project Title <span style={{ color: 'rgb(220 38 38)' }}>*</span>
                    </label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => updateData({ title: e.target.value })}
                        placeholder="The Meridian Residence"
                        style={inputStyle}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#C9A96E';
                            e.target.style.boxShadow = '0 0 0 3px rgba(201, 169, 110, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgb(212 212 212)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>

                {/* Description */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>
                        Short Description <span style={{ color: 'rgb(220 38 38)' }}>*</span>
                    </label>
                    <textarea
                        value={data.description}
                        onChange={(e) => updateData({ description: e.target.value })}
                        placeholder="A brief overview of the project..."
                        rows={4}
                        style={{
                            ...inputStyle,
                            resize: 'vertical',
                            minHeight: '100px',
                            lineHeight: '1.6'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#C9A96E';
                            e.target.style.boxShadow = '0 0 0 3px rgba(201, 169, 110, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgb(212 212 212)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>

                {/* Two Column Grid */}
                <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                    {/* Client */}
                    <div>
                        <label style={labelStyle}>
                            Client Name <span style={{ color: 'rgb(220 38 38)' }}>*</span>
                        </label>
                        <input
                            type="text"
                            value={data.client}
                            onChange={(e) => updateData({ client: e.target.value })}
                            placeholder="Private Client"
                            style={inputStyle}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#C9A96E';
                                e.target.style.boxShadow = '0 0 0 3px rgba(201, 169, 110, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgb(212 212 212)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label style={labelStyle}>
                            Location <span style={{ color: 'rgb(220 38 38)' }}>*</span>
                        </label>
                        <input
                            type="text"
                            value={data.location}
                            onChange={(e) => updateData({ location: e.target.value })}
                            placeholder="Mumbai, India"
                            style={inputStyle}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#C9A96E';
                                e.target.style.boxShadow = '0 0 0 3px rgba(201, 169, 110, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgb(212 212 212)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    {/* Duration */}
                    <div>
                        <label style={labelStyle}>
                            Duration
                        </label>
                        <input
                            type="text"
                            value={data.duration}
                            onChange={(e) => updateData({ duration: e.target.value })}
                            placeholder="8 months"
                            style={inputStyle}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#C9A96E';
                                e.target.style.boxShadow = '0 0 0 3px rgba(201, 169, 110, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgb(212 212 212)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    {/* Year */}
                    <div>
                        <label style={labelStyle}>
                            Year <span style={{ color: 'rgb(220 38 38)' }}>*</span>
                        </label>
                        <input
                            type="text"
                            value={data.year}
                            onChange={(e) => updateData({ year: e.target.value })}
                            placeholder="2024"
                            style={inputStyle}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#C9A96E';
                                e.target.style.boxShadow = '0 0 0 3px rgba(201, 169, 110, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgb(212 212 212)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    {/* Area */}
                    <div>
                        <label style={labelStyle}>
                            Area (sq ft)
                        </label>
                        <input
                            type="text"
                            value={data.area}
                            onChange={(e) => updateData({ area: e.target.value })}
                            placeholder="4,500 sq ft"
                            style={inputStyle}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#C9A96E';
                                e.target.style.boxShadow = '0 0 0 3px rgba(201, 169, 110, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgb(212 212 212)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    {/* Budget */}
                    <div>
                        <label style={labelStyle}>
                            Budget
                        </label>
                        <input
                            type="text"
                            value={data.budget}
                            onChange={(e) => updateData({ budget: e.target.value })}
                            placeholder="₹2.5 Cr"
                            style={inputStyle}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#C9A96E';
                                e.target.style.boxShadow = '0 0 0 3px rgba(201, 169, 110, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgb(212 212 212)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
