"use client";

import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { ProjectDraft } from "@/lib/adminData";
import { useState } from "react";

interface DetailsStepProps {
    data: ProjectDraft;
    updateData: (updates: Partial<ProjectDraft>) => void;
}

const inputStyle = {
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
    marginBottom: '12px'
};

export default function DetailsStep({ data, updateData }: DetailsStepProps) {
    const [featureInput, setFeatureInput] = useState('');
    const [materialInput, setMaterialInput] = useState('');
    const [teamMember, setTeamMember] = useState({ name: '', role: '' });

    const addFeature = () => {
        if (featureInput.trim()) {
            updateData({ features: [...data.features, featureInput.trim()] });
            setFeatureInput('');
        }
    };

    const removeFeature = (index: number) => {
        updateData({ features: data.features.filter((_, i) => i !== index) });
    };

    const addMaterial = () => {
        if (materialInput.trim()) {
            updateData({ materials: [...data.materials, materialInput.trim()] });
            setMaterialInput('');
        }
    };

    const removeMaterial = (index: number) => {
        updateData({ materials: data.materials.filter((_, i) => i !== index) });
    };

    const addTeamMember = () => {
        if (teamMember.name.trim() && teamMember.role.trim()) {
            updateData({ team: [...data.team, teamMember] });
            setTeamMember({ name: '', role: '' });
        }
    };

    const removeTeamMember = (index: number) => {
        updateData({ team: data.team.filter((_, i) => i !== index) });
    };

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
                    Project Details
                </h3>
                <p style={{ color: 'rgb(82 82 82)', fontSize: '15px' }}>
                    Add features, materials, and team members
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {/* Key Features */}
                <div>
                    <label style={labelStyle}>Key Features</label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                        <input
                            type="text"
                            value={featureInput}
                            onChange={(e) => setFeatureInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                            placeholder="Type a feature and press Enter"
                            style={{ ...inputStyle, flex: 1 }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#C9A96E';
                                e.target.style.boxShadow = '0 0 0 3px rgba(201, 169, 110, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgb(212 212 212)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={addFeature}
                            style={{
                                padding: '14px 16px',
                                borderRadius: '12px',
                                background: '#C9A96E',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#A8844A'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#C9A96E'}
                        >
                            <Plus style={{ width: '20px', height: '20px' }} />
                        </motion.button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {data.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 12px',
                                    background: 'rgb(245 245 245)',
                                    borderRadius: '8px'
                                }}
                            >
                                <span style={{ fontSize: '14px', color: 'rgb(64 64 64)' }}>{feature}</span>
                                <button
                                    onClick={() => removeFeature(index)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'rgb(163 163 163)',
                                        transition: 'color 0.2s',
                                        padding: 0,
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(220 38 38)'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(163 163 163)'}
                                >
                                    <X style={{ width: '16px', height: '16px' }} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Materials Used */}
                <div>
                    <label style={labelStyle}>Materials Used</label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                        <input
                            type="text"
                            value={materialInput}
                            onChange={(e) => setMaterialInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMaterial())}
                            placeholder="Type a material and press Enter"
                            style={{ ...inputStyle, flex: 1 }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#C9A96E';
                                e.target.style.boxShadow = '0 0 0 3px rgba(201, 169, 110, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgb(212 212 212)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={addMaterial}
                            style={{
                                padding: '14px 16px',
                                borderRadius: '12px',
                                background: '#C9A96E',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#A8844A'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#C9A96E'}
                        >
                            <Plus style={{ width: '20px', height: '20px' }} />
                        </motion.button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {data.materials.map((material, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 12px',
                                    background: 'rgb(245 245 245)',
                                    borderRadius: '8px'
                                }}
                            >
                                <span style={{ fontSize: '14px', color: 'rgb(64 64 64)' }}>{material}</span>
                                <button
                                    onClick={() => removeMaterial(index)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'rgb(163 163 163)',
                                        transition: 'color 0.2s',
                                        padding: 0,
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(220 38 38)'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(163 163 163)'}
                                >
                                    <X style={{ width: '16px', height: '16px' }} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Project Team */}
                <div>
                    <label style={labelStyle}>Project Team</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '8px', marginBottom: '12px' }}>
                        <input
                            type="text"
                            value={teamMember.name}
                            onChange={(e) => setTeamMember({ ...teamMember, name: e.target.value })}
                            placeholder="Name"
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
                        <input
                            type="text"
                            value={teamMember.role}
                            onChange={(e) => setTeamMember({ ...teamMember, role: e.target.value })}
                            placeholder="Role"
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
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={addTeamMember}
                            style={{
                                padding: '14px 16px',
                                borderRadius: '12px',
                                background: '#C9A96E',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#A8844A'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#C9A96E'}
                        >
                            <Plus style={{ width: '20px', height: '20px' }} />
                        </motion.button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {data.team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '12px 16px',
                                    background: 'rgb(250 250 250)',
                                    borderRadius: '12px'
                                }}
                            >
                                <div>
                                    <p style={{ fontSize: '14px', fontWeight: '500', color: 'rgb(23 23 23)' }}>
                                        {member.name}
                                    </p>
                                    <p style={{ fontSize: '12px', color: 'rgb(115 115 115)', marginTop: '2px' }}>
                                        {member.role}
                                    </p>
                                </div>
                                <button
                                    onClick={() => removeTeamMember(index)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'rgb(163 163 163)',
                                        transition: 'color 0.2s',
                                        padding: 0,
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(220 38 38)'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(163 163 163)'}
                                >
                                    <X style={{ width: '20px', height: '20px' }} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
