/**
 * TypeScript interfaces mirroring Spring Boot backend DTOs exactly.
 * Field names match what the API returns — do NOT rename them here.
 */

// ─── Generic wrappers ─────────────────────────────────────────────────────────

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

/** Spring Page<T> content wrapper */
export interface ApiPage<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;      // current page (0-indexed)
    size: number;
    last: boolean;
    first: boolean;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthResponse {
    token: string;
    tokenType: string;
    expiresIn: number;
    adminId: number;
    name: string;
    email: string;
    role: 'MAIN_ADMIN' | 'ADMIN';
}

export interface DecodedToken {
    sub: string;   // email
    exp: number;
    iat: number;
}

/** Shape stored in AuthContext.user */
export interface AuthUser {
    adminId: number;
    name: string;
    email: string;
    role: 'MAIN_ADMIN' | 'ADMIN';
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export type ProjectStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface TeamMemberResponse {
    id: number;
    name: string;
    role: string;
}

export interface ProjectListResponse {
    id: number;
    title: string;
    description: string;
    category: string;
    location: string;
    year: string;
    status: ProjectStatus;
    imageUrl: string | null;
    createdAt: string;
}

export interface ProjectResponse extends ProjectListResponse {
    client: string;
    duration: string;
    area: string;
    budget: string;
    challenge: string;
    solution: string;
    videoUrl: string | null;
    features: string[];
    materials: string[];
    teamMembers: TeamMemberResponse[];
    updatedAt: string;
}

export interface TeamMemberRequest {
    name: string;
    role: string;
}

export interface ProjectRequest {
    title: string;
    description: string;
    client: string;
    category: string;
    location: string;
    year: string;
    duration: string;
    area: string;
    budget: string;
    challenge: string;
    solution: string;
    status: ProjectStatus;
    imageUrl: string | null;
    videoUrl: string | null;
    features: string[];
    materials: string[];
    teamMembers: TeamMemberRequest[];
}

// ─── Inquiries ────────────────────────────────────────────────────────────────

export type InquiryStatus = 'NEW' | 'READ' | 'ARCHIVED';

export interface InquiryResponse {
    id: number;
    name: string;
    email: string;
    phone: string;
    projectType: string;
    message: string;
    status: InquiryStatus;
    createdAt: string;
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

export interface ReviewResponse {
    id: number;
    quote: string;
    author: string;
    role: string;
    location: string;
    rating: number;
    active: boolean;
    createdAt: string;
}

export interface ReviewRequest {
    quote: string;
    author: string;
    role: string;
    location: string;
    rating: number;
    active?: boolean;
}

// ─── Admin users ──────────────────────────────────────────────────────────────

export interface AdminUserResponse {
    id: number;
    name: string;
    email: string;
    role: 'MAIN_ADMIN' | 'ADMIN';
    createdAt: string;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export interface DashboardStatsResponse {
    totalProjects: number;
    publishedProjects: number;
    draftProjects: number;
    totalInquiries: number;
    newInquiries: number;
    totalReviews: number;
    activeReviews: number;
}

export interface ActivityResponse {
    id: number;
    type: string;
    message: string;
    createdAt: string;
}
