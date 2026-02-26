"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Image as ImageIcon, Video, Upload } from "lucide-react";
import { ProjectDraft } from "@/lib/adminData";
import apiClient from "@/lib/api";

interface MediaStepProps {
    data: ProjectDraft;
    updateData: (updates: Partial<ProjectDraft>) => void;
}

export default function MediaStep({ data, updateData }: MediaStepProps) {
    const [uploading, setUploading] = useState<"image" | "video" | null>(null);
    const [uploadError, setUploadError] = useState("");

    /**
     * Upload file to POST /admin/upload (multipart/form-data).
     * Backend returns { success, data: { url: "/media/images/uuid.jpg" } }
     * We immediately inject the returned URL into the project draft.
     */
    const uploadFile = async (
        file: File,
        type: "image" | "video"
    ): Promise<string | null> => {
        const form = new FormData();
        form.append("file", file);

        try {
            setUploading(type);
            setUploadError("");
            const res = await apiClient.post<{ success: boolean; data: { url: string } }>(
                "/admin/upload",
                form,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            return res.data.data?.url ?? null;
        } catch {
            setUploadError("Upload failed — please try again.");
            return null;
        } finally {
            setUploading(null);
        }
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Show local preview immediately
        const localPreview = URL.createObjectURL(file);
        updateData({ mainImage: file, mainImagePreview: localPreview });

        // Upload to backend and replace preview with server URL
        const url = await uploadFile(file, "image");
        if (url) {
            updateData({ mainImagePreview: url });
        }
    };

    const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const localPreview = URL.createObjectURL(file);
        updateData({ video: file, videoPreview: localPreview });

        const url = await uploadFile(file, "video");
        if (url) {
            updateData({ videoPreview: url });
        }
    };

    const removeImage = () => {
        updateData({ mainImage: null, mainImagePreview: "" });
    };

    const removeVideo = () => {
        updateData({ video: null, videoPreview: "" });
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ marginBottom: "32px" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", color: "rgb(23 23 23)", marginBottom: "8px" }}>
                    Media Assets
                </h3>
                <p style={{ color: "rgb(82 82 82)", fontSize: "15px" }}>
                    Upload project images and transformation video
                </p>
            </div>

            {uploadError && (
                <div style={{
                    padding: "12px 16px",
                    borderRadius: "10px",
                    background: "rgb(254 242 242)",
                    border: "1px solid rgb(254 202 202)",
                    color: "rgb(220 38 38)",
                    fontSize: "14px",
                    marginBottom: "24px",
                }}>
                    {uploadError}
                </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                {/* Main Image */}
                <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "rgb(64 64 64)", marginBottom: "12px" }}>
                        Main Project Image <span style={{ color: "rgb(220 38 38)" }}>*</span>
                    </label>

                    {!data.mainImagePreview ? (
                        <label style={{ display: "block", cursor: uploading === "image" ? "not-allowed" : "pointer" }}>
                            <input type="file" accept="image/jpeg,image/png" onChange={handleImageChange} style={{ display: "none" }} disabled={!!uploading} />
                            <motion.div
                                whileHover={!uploading ? { scale: 1.01 } : {}}
                                style={{ border: "2px dashed rgb(212 212 212)", borderRadius: "16px", padding: "48px", textAlign: "center", transition: "all 0.2s" }}
                                onMouseEnter={(e) => { if (!uploading) { e.currentTarget.style.borderColor = "#C9A96E"; e.currentTarget.style.background = "rgb(250 250 250)"; } }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgb(212 212 212)"; e.currentTarget.style.background = "transparent"; }}
                            >
                                <div style={{ width: "64px", height: "64px", margin: "0 auto 16px", borderRadius: "50%", background: "rgb(245 245 245)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {uploading === "image"
                                        ? <Upload style={{ width: "32px", height: "32px", color: "#C9A96E", animation: "spin 1s linear infinite" }} />
                                        : <ImageIcon style={{ width: "32px", height: "32px", color: "rgb(163 163 163)" }} />
                                    }
                                </div>
                                <p style={{ color: "rgb(64 64 64)", fontWeight: "500", marginBottom: "4px" }}>
                                    {uploading === "image" ? "Uploading…" : "Click to upload image"}
                                </p>
                                <p style={{ fontSize: "14px", color: "rgb(115 115 115)" }}>PNG, JPG</p>
                            </motion.div>
                        </label>
                    ) : (
                        <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", border: "1px solid rgb(229 229 229)" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={data.mainImagePreview} alt="Preview" style={{ width: "100%", height: "256px", objectFit: "cover" }} />
                            {uploading === "image" && (
                                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <span style={{ color: "white", fontSize: "14px" }}>Uploading…</span>
                                </div>
                            )}
                            <motion.button
                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                onClick={removeImage}
                                style={{ position: "absolute", top: "16px", right: "16px", width: "32px", height: "32px", background: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)", border: "none", cursor: "pointer" }}
                                onMouseEnter={(e) => e.currentTarget.style.background = "rgb(254 242 242)"}
                                onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                            >
                                <X style={{ width: "20px", height: "20px", color: "rgb(220 38 38)" }} />
                            </motion.button>
                        </div>
                    )}
                </div>

                {/* Video */}
                <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "rgb(64 64 64)", marginBottom: "12px" }}>
                        Transformation Video (Optional)
                    </label>

                    {!data.videoPreview ? (
                        <label style={{ display: "block", cursor: uploading === "video" ? "not-allowed" : "pointer" }}>
                            <input type="file" accept="video/mp4" onChange={handleVideoChange} style={{ display: "none" }} disabled={!!uploading} />
                            <motion.div
                                whileHover={!uploading ? { scale: 1.01 } : {}}
                                style={{ border: "2px dashed rgb(212 212 212)", borderRadius: "16px", padding: "48px", textAlign: "center", transition: "all 0.2s" }}
                                onMouseEnter={(e) => { if (!uploading) { e.currentTarget.style.borderColor = "#C9A96E"; e.currentTarget.style.background = "rgb(250 250 250)"; } }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgb(212 212 212)"; e.currentTarget.style.background = "transparent"; }}
                            >
                                <div style={{ width: "64px", height: "64px", margin: "0 auto 16px", borderRadius: "50%", background: "rgb(245 245 245)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {uploading === "video"
                                        ? <Upload style={{ width: "32px", height: "32px", color: "#C9A96E", animation: "spin 1s linear infinite" }} />
                                        : <Video style={{ width: "32px", height: "32px", color: "rgb(163 163 163)" }} />
                                    }
                                </div>
                                <p style={{ color: "rgb(64 64 64)", fontWeight: "500", marginBottom: "4px" }}>
                                    {uploading === "video" ? "Uploading…" : "Click to upload video"}
                                </p>
                                <p style={{ fontSize: "14px", color: "rgb(115 115 115)" }}>MP4</p>
                            </motion.div>
                        </label>
                    ) : (
                        <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", border: "1px solid rgb(229 229 229)" }}>
                            <video src={data.videoPreview} controls style={{ width: "100%", height: "256px", objectFit: "cover", background: "black" }} />
                            <motion.button
                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                onClick={removeVideo}
                                style={{ position: "absolute", top: "16px", right: "16px", width: "32px", height: "32px", background: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)", border: "none", cursor: "pointer" }}
                                onMouseEnter={(e) => e.currentTarget.style.background = "rgb(254 242 242)"}
                                onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                            >
                                <X style={{ width: "20px", height: "20px", color: "rgb(220 38 38)" }} />
                            </motion.button>
                        </div>
                    )}
                </div>
            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </motion.div>
    );
}
