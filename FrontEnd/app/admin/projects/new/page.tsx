"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import BasicInfoStep from "@/components/admin/wizard/BasicInfoStep";
import MediaStep from "@/components/admin/wizard/MediaStep";
import StoryStep from "@/components/admin/wizard/StoryStep";
import DetailsStep from "@/components/admin/wizard/DetailsStep";
import SuccessModal from "@/components/admin/wizard/SuccessModal";
import { ProjectDraft, emptyProjectDraft } from "@/lib/adminData";
import apiClient from "@/lib/api";
import { useToast } from "@/context/ToastContext";
import { useSubmitGuard } from "@/context/SubmitGuardContext";

const steps = [
    { id: 1, name: "Basic Info", description: "Project details" },
    { id: 2, name: "Media", description: "Images & videos" },
    { id: 3, name: "Story", description: "Challenge & solution" },
    { id: 4, name: "Details", description: "Features & team" },
];

export default function AddProjectPage() {
    const router = useRouter();
    const toast = useToast();
    const { setSubmitting } = useSubmitGuard();
    const [currentStep, setCurrentStep] = useState(1);
    const [projectData, setProjectData] = useState<ProjectDraft>(emptyProjectDraft);
    const [showSuccess, setShowSuccess] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [savingDraft, setSavingDraft] = useState(false);

    const updateProjectData = (updates: Partial<ProjectDraft>) => {
        setProjectData(prev => ({ ...prev, ...updates }));
    };

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const buildPayload = (status: 'PUBLISHED' | 'DRAFT') => ({
        title: projectData.title,
        description: projectData.description,
        client: projectData.client,
        category: projectData.category,
        location: projectData.location,
        year: projectData.year,
        duration: projectData.duration,
        area: projectData.area,
        budget: projectData.budget,
        challenge: projectData.challenge,
        solution: projectData.solution,
        status,
        imageUrl: projectData.mainImagePreview || null,
        videoUrl: projectData.videoPreview || null,
        features: projectData.features ?? [],
        materials: projectData.materials ?? [],
        teamMembers: projectData.team ?? [],   // backend expects teamMembers; draft stores as .team
    });

    const handleSaveDraft = async () => {
        if (savingDraft || publishing) return;
        setSavingDraft(true);
        setSubmitting(true);
        try {
            await apiClient.post('/admin/projects', buildPayload('DRAFT'));
            toast.success('Draft saved!');
            router.push('/admin/projects');
        } catch {
            toast.error('Failed to save draft. Please try again.');
        } finally {
            setSavingDraft(false);
            setSubmitting(false);
        }
    };

    const handlePublish = async () => {
        if (publishing || savingDraft) return;
        setPublishing(true);
        setSubmitting(true);
        try {
            await apiClient.post('/admin/projects', buildPayload('PUBLISHED'));
            toast.success('Project published successfully!');
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                setProjectData(emptyProjectDraft);
                setCurrentStep(1);
                router.push('/admin/projects');
            }, 2000);
        } catch {
            toast.error('Failed to publish project. Please try again.');
        } finally {
            setPublishing(false);
            setSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Progress Steps */}
            <div style={{ marginBottom: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {steps.map((step, index) => (
                        <div key={step.id} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                                {/* Step Circle */}
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s',
                                        background: currentStep > step.id || currentStep === step.id ? '#C9A96E' : 'rgb(229 229 229)',
                                        color: currentStep > step.id || currentStep === step.id ? 'white' : 'rgb(163 163 163)',
                                        boxShadow: currentStep === step.id ? '0 0 0 4px rgba(201, 169, 110, 0.2)' : 'none',
                                        fontWeight: '600'
                                    }}
                                >
                                    {currentStep > step.id ? (
                                        <Check style={{ width: '24px', height: '24px' }} />
                                    ) : (
                                        <span>{step.id}</span>
                                    )}
                                </motion.div>

                                {/* Step Label */}
                                <div style={{ marginTop: '12px', textAlign: 'center' }}>
                                    <p style={{
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: currentStep >= step.id ? 'rgb(23 23 23)' : 'rgb(163 163 163)'
                                    }}>
                                        {step.name}
                                    </p>
                                    <p style={{ fontSize: '12px', color: 'rgb(115 115 115)', marginTop: '4px' }}>
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div style={{
                                    flex: 1,
                                    height: '2px',
                                    background: 'rgb(229 229 229)',
                                    margin: '0 16px',
                                    marginTop: '-48px',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <motion.div
                                        initial={{ width: '0%' }}
                                        animate={{ width: currentStep > step.id ? '100%' : '0%' }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            height: '100%',
                                            background: '#C9A96E'
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{
                    background: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    border: '1px solid rgb(245 245 245)',
                    padding: '32px'
                }}
            >
                <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                        <BasicInfoStep
                            data={projectData}
                            updateData={updateProjectData}
                        />
                    )}
                    {currentStep === 2 && (
                        <MediaStep
                            data={projectData}
                            updateData={updateProjectData}
                        />
                    )}
                    {currentStep === 3 && (
                        <StoryStep
                            data={projectData}
                            updateData={updateProjectData}
                        />
                    )}
                    {currentStep === 4 && (
                        <DetailsStep
                            data={projectData}
                            updateData={updateProjectData}
                        />
                    )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '32px',
                    paddingTop: '32px',
                    borderTop: '1px solid rgb(229 229 229)'
                }}>
                    <div>
                        {currentStep > 1 && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleBack}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '12px',
                                    border: '1px solid rgb(212 212 212)',
                                    color: 'rgb(64 64 64)',
                                    background: 'white',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgb(250 250 250)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                            >
                                Back
                            </motion.button>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <motion.button
                            whileHover={{ scale: (savingDraft || publishing) ? 1 : 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSaveDraft}
                            disabled={savingDraft || publishing}
                            aria-busy={savingDraft}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '12px',
                                border: '1px solid rgb(212 212 212)',
                                color: (savingDraft || publishing) ? 'rgb(163 163 163)' : 'rgb(64 64 64)',
                                background: 'white',
                                cursor: (savingDraft || publishing) ? 'not-allowed' : 'pointer',
                                transition: 'background-color 0.2s',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}
                            onMouseEnter={(e) => { if (!savingDraft && !publishing) e.currentTarget.style.background = 'rgb(250 250 250)'; }}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                        >
                            Save Draft
                        </motion.button>

                        {currentStep < steps.length ? (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleNext}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '12px',
                                    background: '#C9A96E',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#A8844A'}
                                onMouseLeave={(e) => e.currentTarget.style.background = '#C9A96E'}
                            >
                                Next Step
                            </motion.button>
                        ) : (
                            <motion.button
                                whileHover={{ scale: (publishing || savingDraft) ? 1 : 1.02, boxShadow: (publishing || savingDraft) ? 'none' : '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handlePublish}
                                disabled={publishing || savingDraft}
                                aria-busy={publishing}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '12px',
                                    background: (publishing || savingDraft) ? 'rgb(212 212 212)' : 'linear-gradient(to right, #C9A96E, #A8844A)',
                                    color: (publishing || savingDraft) ? 'rgb(115 115 115)' : 'white',
                                    border: 'none',
                                    cursor: (publishing || savingDraft) ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.2s',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}
                            >
                                {publishing ? 'Publishing…' : 'Publish Project'}
                            </motion.button>
                        )}
                    </div>
                </div>
            </motion.div >

            {/* Success Modal */}
            < SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)
            } />
        </div >
    );
}
