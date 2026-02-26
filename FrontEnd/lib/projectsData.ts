export interface ProjectData {
    id: string;
    slug: string;
    title: string;
    category: string;
    location: string;
    year: string;
    description: string;
    image: string;
    
    // Detail page data
    client: string;
    duration: string;
    area: string;
    budget: string;
    
    challenge: string;
    solution: string;
    planning: string;
    
    beforeImages: string[];
    afterImages: string[];
    videoUrl?: string;
    
    features: string[];
    materials: string[];
    team: { role: string; name: string }[];
}

export const projectsData: ProjectData[] = [
    {
        id: "01",
        slug: "meridian-residence",
        title: "The Meridian Residence",
        category: "Luxury Residential",
        location: "Mumbai, India",
        year: "2024",
        description: "Where contemporary living meets refined elegance. Marble accents, crystal chandelier, and bespoke furniture in perfect harmony.",
        image: "/images/IMG-20251207-WA0030.jpg",
        
        client: "Private Client",
        duration: "8 months",
        area: "4,500 sq ft",
        budget: "₹2.5 Cr",
        
        challenge: "The client wanted a modern luxury home that felt warm and inviting, not cold and sterile. The existing space had low ceilings and poor natural light distribution.",
        solution: "We introduced a neutral palette with warm gold accents, custom lighting design to enhance ceiling height perception, and strategic mirror placement to amplify natural light. Italian marble flooring and bespoke furniture pieces created the luxury feel while maintaining warmth.",
        planning: "Initial consultation and site analysis (2 weeks) → Concept development with 3 design directions (3 weeks) → Client selection and refinement (4 weeks) → 3D visualization and material sourcing (3 weeks) → Execution phase with weekly site visits (6 months) → Final styling and handover (2 weeks)",
        
        beforeImages: ["/images/IMG-20251207-WA0031.jpg", "/images/IMG-20251207-WA0032.jpg"],
        afterImages: ["/images/IMG-20251207-WA0030.jpg", "/images/IMG-20251207-WA0033.jpg", "/images/IMG-20251207-WA0034.jpg"],
        videoUrl: "/Preview.mp4",
        
        features: [
            "Custom Italian marble flooring throughout",
            "Bespoke crystal chandelier from Czech Republic",
            "Smart home automation system",
            "Custom-designed modular furniture",
            "Integrated ambient lighting design",
            "Curated art collection display system"
        ],
        materials: [
            "Italian Statuario marble",
            "Walnut wood veneer",
            "Brass fixtures and hardware",
            "Belgian linen upholstery",
            "Hand-tufted wool rugs",
            "Crystal and glass accents"
        ],
        team: [
            { role: "Lead Designer", name: "Priya Sharma" },
            { role: "Project Manager", name: "Rahul Mehta" },
            { role: "Lighting Consultant", name: "Anita Desai" },
            { role: "Furniture Designer", name: "Vikram Singh" }
        ]
    },
    {
        id: "02",
        slug: "coastal-dream-villa",
        title: "Coastal Dream Villa",
        category: "Luxury Residential",
        location: "Goa, India",
        year: "2024",
        description: "An open living-dining space where rich blue tones meet natural light. Curated art collection and hand-crafted dining furniture.",
        image: "/images/IMG-20251207-WA0017.jpg",
        
        client: "Private Client",
        duration: "10 months",
        area: "6,200 sq ft",
        budget: "₹3.2 Cr",
        
        challenge: "Creating a vacation home that captures the coastal essence while providing luxury amenities. The client wanted a space that felt connected to the ocean without being overtly nautical.",
        solution: "We used a sophisticated blue and white palette inspired by the sea and sky, incorporated natural materials like teak and rattan, and designed large openings to frame ocean views. Custom furniture pieces were crafted by local Goan artisans.",
        planning: "Site visits and coastal climate analysis (3 weeks) → Concept development with mood boards (4 weeks) → Design refinement and material selection (5 weeks) → Vendor coordination and custom furniture design (6 weeks) → Construction and installation (7 months) → Final touches and landscaping (3 weeks)",
        
        beforeImages: ["/images/IMG-20251207-WA0018.jpg", "/images/IMG-20251207-WA0019.jpg"],
        afterImages: ["/images/IMG-20251207-WA0017.jpg", "/images/IMG-20251207-WA0020.jpg", "/images/IMG-20251207-WA0021.jpg"],
        videoUrl: "/Preview.mp4",
        
        features: [
            "Floor-to-ceiling windows with ocean views",
            "Custom teak wood dining table for 12",
            "Outdoor-indoor living spaces",
            "Infinity pool with ocean backdrop",
            "Local Goan art collection",
            "Natural ventilation system"
        ],
        materials: [
            "Teak wood from sustainable sources",
            "Natural rattan and cane",
            "Portuguese tiles",
            "Linen and cotton fabrics",
            "Sandstone flooring",
            "Recycled glass accents"
        ],
        team: [
            { role: "Lead Designer", name: "Simran Kaur" },
            { role: "Architect", name: "Arjun Patel" },
            { role: "Landscape Designer", name: "Maya Fernandes" },
            { role: "Local Artisan Coordinator", name: "Jose D'Souza" }
        ]
    },
    {
        id: "03",
        slug: "azure-penthouse",
        title: "The Azure Penthouse",
        category: "Luxury Residential",
        location: "Pune, India",
        year: "2023",
        description: "Serene master bedroom retreat with hand-painted accent wall, bespoke pendant lighting, and premium textiles.",
        image: "/images/IMG-20251207-WA0040.jpg",
        
        client: "Private Client",
        duration: "6 months",
        area: "3,800 sq ft",
        budget: "₹1.8 Cr",
        
        challenge: "Transforming a standard penthouse into a serene sanctuary with a focus on the master suite. The client wanted a calming retreat from their busy corporate life.",
        solution: "We created a spa-like master bedroom with custom hand-painted murals, integrated a walk-in closet with luxury finishes, and designed a private balcony sitting area. Soft textures and a muted color palette promote relaxation.",
        planning: "Client lifestyle analysis (2 weeks) → Concept and mood board creation (3 weeks) → Design development and artist collaboration (4 weeks) → Material procurement (3 weeks) → Execution and custom work (4 months) → Styling and handover (2 weeks)",
        
        beforeImages: ["/images/IMG-20251207-WA0041.jpg", "/images/IMG-20251207-WA0042.jpg"],
        afterImages: ["/images/IMG-20251207-WA0040.jpg", "/images/IMG-20251207-WA0043.jpg", "/images/IMG-20251207-WA0044.jpg"],
        videoUrl: "/Preview.mp4",
        
        features: [
            "Hand-painted accent wall by local artist",
            "Custom brass pendant lighting",
            "Walk-in closet with LED lighting",
            "Integrated sound system",
            "Blackout and sheer curtain system",
            "Private balcony lounge"
        ],
        materials: [
            "Premium Egyptian cotton bedding",
            "Velvet upholstery",
            "Brass and gold fixtures",
            "Engineered oak flooring",
            "Silk wallpaper",
            "Marble bathroom surfaces"
        ],
        team: [
            { role: "Lead Designer", name: "Neha Kapoor" },
            { role: "Mural Artist", name: "Rohan Joshi" },
            { role: "Lighting Designer", name: "Kavita Reddy" },
            { role: "Textile Consultant", name: "Meera Iyer" }
        ]
    },
    {
        id: "04",
        slug: "elara-private-suites",
        title: "Élara Private Suites",
        category: "Commercial · Hospitality",
        location: "New Delhi, India",
        year: "2023",
        description: "Dramatic dark marble feature wall, floating platform bed, and integrated study — a sanctuary for the discerning executive.",
        image: "/images/IMG-20251207-WA0050.jpg",
        
        client: "Élara Hospitality Group",
        duration: "12 months",
        area: "25,000 sq ft (15 suites)",
        budget: "₹8 Cr",
        
        challenge: "Designing boutique hotel suites that cater to business executives who demand both luxury and functionality. Each suite needed to feel like a private residence, not a hotel room.",
        solution: "We created 15 unique suites with residential-style layouts, integrated work areas, and dramatic design elements. Dark marble feature walls, custom furniture, and high-end technology created a sophisticated atmosphere.",
        planning: "Brand positioning and target audience analysis (4 weeks) → Concept development for suite types (6 weeks) → Prototype suite design and client approval (8 weeks) → FF&E procurement and custom manufacturing (4 months) → Phased installation across 15 suites (6 months) → Soft opening and adjustments (4 weeks)",
        
        beforeImages: ["/images/IMG-20251207-WA0048.jpg", "/images/IMG-20251207-WA0049.jpg"],
        afterImages: ["/images/IMG-20251207-WA0050.jpg", "/images/IMG-20251207-WA0051.jpg", "/images/IMG-20251207-WA0046.jpg"],
        videoUrl: "/Preview.mp4",
        
        features: [
            "Dramatic black marble feature walls",
            "Floating platform beds with integrated lighting",
            "Executive work desk with ergonomic seating",
            "Smart room controls (lighting, temperature, privacy)",
            "Luxury bathroom with rain shower and soaking tub",
            "Mini bar and coffee station"
        ],
        materials: [
            "Black Marquina marble",
            "Walnut wood paneling",
            "Leather upholstery",
            "Brushed brass fixtures",
            "Porcelain tile",
            "Acoustic wall panels"
        ],
        team: [
            { role: "Lead Designer", name: "Aditya Malhotra" },
            { role: "Hospitality Consultant", name: "Sanjay Gupta" },
            { role: "FF&E Specialist", name: "Ritu Sharma" },
            { role: "Technology Integration", name: "Karan Bhatia" }
        ]
    },
    {
        id: "05",
        slug: "nexus-corporate-hq",
        title: "Nexus Corporate HQ",
        category: "Commercial · Office",
        location: "Bengaluru, India",
        year: "2022",
        description: "Modern workplace with marble reception, open lounge zones, and warm wood finishes — where productivity meets aesthetics.",
        image: "/images/IMG-20251207-WA0051.jpg",
        
        client: "Nexus Technologies Pvt Ltd",
        duration: "14 months",
        area: "45,000 sq ft",
        budget: "₹12 Cr",
        
        challenge: "Creating a corporate headquarters that attracts top talent while promoting collaboration and productivity. The client wanted to move away from traditional cubicle layouts.",
        solution: "We designed an open-plan office with distinct zones for collaboration, focus work, and relaxation. A stunning marble reception sets the tone, while warm wood finishes and biophilic design elements create a welcoming atmosphere.",
        planning: "Workplace strategy and employee surveys (6 weeks) → Space planning and zoning (8 weeks) → Design development and material selection (10 weeks) → Vendor selection and procurement (3 months) → Construction and MEP coordination (9 months) → Furniture installation and IT setup (6 weeks) → Phased employee move-in (4 weeks)",
        
        beforeImages: ["/images/IMG-20251207-WA0045.jpg", "/images/IMG-20251207-WA0047.jpg"],
        afterImages: ["/images/IMG-20251207-WA0051.jpg", "/images/IMG-20251207-WA0035.jpg", "/images/IMG-20251207-WA0036.jpg"],
        videoUrl: "/Preview.mp4",
        
        features: [
            "Grand marble reception with company branding",
            "Open collaboration zones with modular furniture",
            "Private phone booths for calls",
            "Wellness room and meditation space",
            "Cafeteria with barista station",
            "Outdoor terrace lounge",
            "Flexible meeting rooms with AV technology"
        ],
        materials: [
            "White Carrara marble",
            "Oak wood flooring and paneling",
            "Acoustic ceiling tiles",
            "Fabric acoustic panels",
            "Powder-coated steel furniture",
            "Indoor plants and green walls"
        ],
        team: [
            { role: "Lead Designer", name: "Pooja Nair" },
            { role: "Workplace Strategist", name: "Amit Kumar" },
            { role: "MEP Consultant", name: "Rajesh Rao" },
            { role: "Branding Designer", name: "Sneha Pillai" }
        ]
    }
];
