// Mock data for admin panel

export interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    projectType: string;
    date: string;
    status: 'new' | 'read' | 'archived';
}

export const mockInquiries: Inquiry[] = [
    {
        id: '1',
        name: 'Priya Sharma',
        email: 'priya.sharma@email.com',
        phone: '+91 98765 43210',
        message: 'I am interested in redesigning my 3BHK apartment in Mumbai. Looking for a modern luxury aesthetic with warm tones. Budget is around ₹25 lakhs. Would love to discuss the project timeline and your availability.',
        projectType: 'Luxury Residential',
        date: '2024-02-19T10:30:00',
        status: 'new'
    },
    {
        id: '2',
        name: 'Rahul Mehta',
        email: 'rahul.mehta@company.com',
        phone: '+91 98123 45678',
        message: 'We need interior design services for our new office space in Bengaluru. The space is approximately 5000 sq ft and we want a collaborative, modern workspace design.',
        projectType: 'Commercial · Office',
        date: '2024-02-18T14:20:00',
        status: 'new'
    },
    {
        id: '3',
        name: 'Anita Desai',
        email: 'anita.d@email.com',
        phone: '+91 99887 76655',
        message: 'Looking for consultation on furniture selection for my living room. I have already completed the basic interior work but need help with final styling and furniture pieces.',
        projectType: 'Interior Styling',
        date: '2024-02-17T09:15:00',
        status: 'read'
    },
    {
        id: '4',
        name: 'Vikram Singh',
        email: 'vikram.singh@email.com',
        phone: '+91 97654 32109',
        message: 'We are building a boutique hotel in Goa with 15 rooms. Need complete interior design including furniture, lighting, and decor. Timeline is 8 months.',
        projectType: 'Commercial · Hospitality',
        date: '2024-02-16T16:45:00',
        status: 'read'
    },
    {
        id: '5',
        name: 'Meera Iyer',
        email: 'meera.iyer@email.com',
        phone: '+91 98234 56789',
        message: 'Interested in your custom furniture design services. Need a dining table for 8 people with matching chairs. Looking for contemporary design with natural wood.',
        projectType: 'Custom Furniture',
        date: '2024-02-15T11:30:00',
        status: 'archived'
    },
    {
        id: '6',
        name: 'Arjun Patel',
        email: 'arjun.patel@email.com',
        phone: '+91 99123 45678',
        message: 'Planning to renovate my villa in Pune. 4500 sq ft space. Want a mix of traditional and modern elements. Can we schedule a site visit?',
        projectType: 'Luxury Residential',
        date: '2024-02-14T13:20:00',
        status: 'archived'
    },
];

export interface ProjectDraft {
    // Basic Info
    title: string;
    description: string;
    client: string;
    location: string;
    duration: string;
    year: string;
    area: string;
    budget: string;
    category: string;
    style: string;

    // Media
    mainImage: File | null;
    mainImagePreview: string;
    video: File | null;
    videoPreview: string;

    // Project Story
    challenge: string;
    solution: string;

    // Details
    features: string[];
    materials: string[];
    team: { name: string; role: string }[];
    /** Alias matching backend TeamMemberRequest[] */
    teamMembers?: { name: string; role: string }[];
}

export const emptyProjectDraft: ProjectDraft = {
    title: '',
    description: '',
    client: '',
    location: '',
    duration: '',
    year: new Date().getFullYear().toString(),
    area: '',
    budget: '',
    category: '',
    style: '',
    mainImage: null,
    mainImagePreview: '',
    video: null,
    videoPreview: '',
    challenge: '',
    solution: '',
    features: [],
    materials: [],
    team: [],
};

export interface Review {
    id: string;
    quote: string;
    author: string;
    role: string;
    location: string;
    date: string;
    status: 'active' | 'inactive';
    rating?: number;
}

export const mockReviews: Review[] = [
    {
        id: '1',
        quote: "Casa Interior didn't just design our home — they understood our life. Every corner feels intentional, every material chosen for a reason. It's the most beautiful space I've ever inhabited.",
        author: 'Priya Mehra',
        role: 'Co-Founder, Mehra Ventures',
        location: 'Mumbai',
        date: '2024-01-15T10:00:00',
        status: 'active',
        rating: 5
    },
    {
        id: '2',
        quote: "The attention to detail is staggering. They sourced marble from Turkey, textiles from Rajasthan, and hardware from Milan — all in perfect harmony. A truly global vision with local soul.",
        author: 'Arjun Kapoor',
        role: 'Architect & Developer',
        location: 'Delhi',
        date: '2024-01-10T14:30:00',
        status: 'active',
        rating: 5
    },
    {
        id: '3',
        quote: "Our hotel lobby has received more compliments than any marketing campaign ever could. Guests tell us it's the most beautiful hotel lobby in India. That's entirely Casa Interior.",
        author: 'Simone D\'Souza',
        role: 'General Manager, Grand Obero',
        location: 'New Delhi',
        date: '2023-12-20T09:15:00',
        status: 'active',
        rating: 5
    },
    {
        id: '4',
        quote: "I was skeptical about the investment. Six months later, I cannot imagine having done it any other way. This space makes me proud every single day.",
        author: 'Rahul Singh',
        role: 'Partner, Nexus Law',
        location: 'Bengaluru',
        date: '2023-12-05T16:45:00',
        status: 'active',
        rating: 5
    },
];
