-- ============================================================
-- V2__seed_projects.sql
-- Casa Interior — Complete Seed Data
--
-- Contains:
--   INSERT INTO projects           (7 rows)
--   INSERT INTO project_team_members
--   INSERT INTO project_images     (all gallery images)
--   INSERT INTO reviews            (18 rows)
--
-- Rules:
--   ✅ No CREATE DATABASE
--   ✅ No USE statement
--   ✅ No hard-coded IDs — uses LAST_INSERT_ID() per project
--   ✅ Flyway single-transaction safe
-- ============================================================


-- ============================================================
-- PROJECTS + VARIABLE CAPTURE
-- One INSERT per project so LAST_INSERT_ID() is reliable.
-- ============================================================

-- ── Project 1: The Azure Residence ─────────────────────────
INSERT INTO projects
    (title, category, description, client, location, duration, year, area, budget, challenge, solution, image_url, status, created_at)
VALUES (
    'The Azure Residence',
    'Apartment',
    'A vibrant yet refined 3BHK centred on a teal, amber, and ivory palette. From the herringbone marble-effect accent wall in the dining zone to the sheer floor-to-ceiling drapes, every surface is composed to feel both lived-in and effortlessly elevated.\n\nThe Azure Residence was reimagined as a statement of contemporary Indian luxury. The open living-dining plan anchors the apartment''s social life with a teal upholstered dining set beneath an architectural butterfly chandelier. Chevron-patterned wall cladding frames bold abstract artwork, while a brass-framed glass coffee table anchors the seating cluster. Warm amber and teal cushions on charcoal and cream sofas maintain visual harmony across the connected spaces. Bedrooms continue the palette in a quieter register — slatted vertical panels, layered pendants, and botanical-print curtains invite calm and rest.',
    'Private Client',
    'Navi Mumbai',
    '4 months',
    2024,
    '1,450 sq ft',
    '₹28–35 Lakhs',
    'Balancing bold, saturated colour accents within an open-plan layout without the space feeling fragmented or visually noisy across three connected zones.',
    'A unified flooring material (large-format ivory vitrified tile) was maintained throughout to visually expand the space. Accent colours were introduced exclusively through soft furnishings and one statement wall per zone, keeping structural surfaces neutral.',
    '/Images/IMG-20251207-WA0017.jpg',
    'PUBLISHED',
    NOW()
);
SET @p1 = LAST_INSERT_ID();

-- ── Project 2: The Birchwood Flat ──────────────────────────
INSERT INTO projects
    (title, category, description, client, location, duration, year, area, budget, challenge, solution, image_url, status, created_at)
VALUES (
    'The Birchwood Flat',
    'Apartment',
    'A Scandinavian-inspired 3BHK designed around warmth, simplicity, and biophilic texture. Cream leather seating, a botanical-wallpaper feature wall, and a handcrafted wooden dining set create a home that feels intentionally unhurried.\n\nConceived for a young professional family seeking a home that breathes, the living-dining room is centred on a botanical vine-motif wallpaper in sage and cream. A Scandinavian dining set — solid wood table with spindle-back chairs in mixed white and grey — is illuminated by a bespoke cluster pendant chandelier. The cream leather sofas paired with a round graphite coffee table provide a grounded, comfortable anchor for the living area.',
    'Private Client',
    'Thane West',
    '3 months',
    2024,
    '1,200 sq ft',
    '₹18–24 Lakhs',
    'Achieving a natural Scandinavian look within the compact dimensions of a Thane apartment without the space feeling staged or cold.',
    'All joinery was executed in pale oak-toned laminates; soft furnishing palettes were limited to cream, slate, and natural linen. The botanical wallpaper was applied only to the single dining feature wall, preventing visual overload while defining the zones.',
    '/Images/IMG-20251207-WA0021.jpg',
    'PUBLISHED',
    NOW()
);
SET @p2 = LAST_INSERT_ID();

-- ── Project 3: The Terracotta Suite ────────────────────────
INSERT INTO projects
    (title, category, description, client, location, duration, year, area, budget, challenge, solution, image_url, status, created_at)
VALUES (
    'The Terracotta Suite',
    'Villa',
    'A hotel-grade master bedroom carved out of a hilltop villa, where terracotta slatted teak panels, a woven palm-leaf ceiling fan, and flanking armchairs create the serenity of a five-star resort room within a private home.\n\nDesigned as the crown jewel of a weekend villa retreat in Lonavala, the brief was clear: bring the resort inside. A full-wall terracotta-orange slatted teak headboard dominates the room with a hand-embroidered motif panel inlaid at eye level. Two solid-wood armchairs with cream linen cushions and a low teak coffee table in front of the bed mirror the arrangement of a boutique hotel lobby.',
    'Private Client',
    'Lonavala',
    '2 months',
    2024,
    '600 sq ft',
    '₹12–16 Lakhs',
    'Bringing warmth and resort character to a plain rectangular bedroom without complex architectural interventions in a weekend property.',
    'A single full-wall teak slatted panel installation transformed the spatial feel entirely. The terracotta-orange stain — unusual in Indian residential design — was the defining stroke, complementing Lonavala''s red-earth landscape.',
    '/Images/IMG-20251207-WA0027.jpg',
    'PUBLISHED',
    NOW()
);
SET @p3 = LAST_INSERT_ID();

-- ── Project 4: Midnight & Mocha Residence ──────────────────
INSERT INTO projects
    (title, category, description, client, location, duration, year, area, budget, challenge, solution, image_url, status, created_at)
VALUES (
    'Midnight & Mocha Residence',
    'Apartment',
    'A dramatically confident 3BHK built on a navy-blue, brown leather, and teal-marble palette. Statement lighting and curated art anchor every room, delivering a home that reads as equally powerful and personal.\n\nBriefed as a designer home for a high-achieving couple, the living room leads with a deep full-height navy accent wall displaying abstract geometric artworks. A cognac-brown leather sofa and hexagonal cluster chandelier create a lounge of genuine sophistication. Secondary bedrooms follow the same conviction: a teal feature wall with gold brass inlay strips, a blue-grey botanical wallpaper bedroom, and an art-deco room with a gold sunburst mirror and tufted headboard.',
    'Private Client',
    'Kharghar, Navi Mumbai',
    '3.5 months',
    2025,
    '1,350 sq ft',
    '₹22–28 Lakhs',
    'Sustaining a bold, dark colour scheme across multiple rooms of a compact apartment without any room feeling smaller or oppressive.',
    'Dark accent walls were used on one wall per room only, with remaining walls in warm white. Mirrors, gold-tone accents, and high-transparency pendant lighting bounce light and maintain spatial generosity.',
    '/Images/IMG-20251207-WA0029.jpg',
    'PUBLISHED',
    NOW()
);
SET @p4 = LAST_INSERT_ID();

-- ── Project 5: The Ivory Grove ─────────────────────────────
INSERT INTO projects
    (title, category, description, client, location, duration, year, area, budget, challenge, solution, image_url, status, created_at)
VALUES (
    'The Ivory Grove',
    'Apartment',
    'A full-home 3BHK fit-out pairing warm teak joinery with cream-marble surfaces, a mint-green modular kitchen, and a dedicated home mandir — all unified by a jali-work ceiling detail and a crystal chandelier.\n\nThe studio''s most comprehensive apartment commission, covering foyer, living-dining, kitchen, three bedrooms, and an integrated mandir. The foyer opens with a wood-framed pillar, a circular gold backlit mirror, and a textured swirl-plaster wall before the living room with crystal chandelier and geometric jali ceiling panel. The mint-sage modular kitchen with black marquina countertop and herringbone ceramic backsplash is a standout. A private Ganesh mandir with dark stone walls, hanging brass diyas, water feature kunds, and a carved wood temple canopy brings spiritual grandeur to the home.',
    'Private Client',
    'Panvel, Navi Mumbai',
    '5 months',
    2025,
    '1,750 sq ft',
    '₹38–48 Lakhs',
    'Integrating a traditional Vastu-compliant mandir, a contemporary modular kitchen, and hotel-style living spaces within a single apartment without stylistic incoherence.',
    'Teak-tone joinery was the unifying thread — appearing across the mandir canopy, kitchen cabinet frames, foyer pillar, and bedroom wardrobes. This allowed each zone to maintain its distinct character while the apartment reads as a single home.',
    '/Images/IMG-20251207-WA0030.jpg',
    'PUBLISHED',
    NOW()
);
SET @p5 = LAST_INSERT_ID();

-- ── Project 6: Prestige WorkSpace ──────────────────────────
INSERT INTO projects
    (title, category, description, client, location, duration, year, area, budget, challenge, solution, image_url, status, created_at)
VALUES (
    'Prestige WorkSpace',
    'Office',
    'A complete corporate office fit-out across reception, boardroom, director''s cabin, and collaborative lounge — unified by walnut, charcoal grey, and crisp white with bespoke 3D artwork installations.\n\nDesigned for a professional services firm, the reception area opens with a marble-faced counter, pendant dome lights, and a brown leather collaborative sofa. The director''s cabin pairs a dark chocolate executive desk with a 3D modular world map wall installation. The boardroom — yellow-velvet conference chairs around a white lacquer table — elevates every team meeting. All spaces share a modular ceiling grid and grey commercial carpet tile, with each zone customised through material proportions and bespoke artwork.',
    'Corporate Client',
    'Belapur CBD, Navi Mumbai',
    '2.5 months',
    2025,
    '2,200 sq ft',
    '₹45–55 Lakhs',
    'Projecting a premium brand identity within a leased mid-rise office floor with standard ceiling heights and a fixed structural grid.',
    'A consistent palette (walnut veneer, grey linen, white lacquer) was applied across all rooms in different proportions. 3D decorative wall installations provided artistic identity without custom architectural modifications.',
    '/Images/IMG-20251207-WA0042.jpg',
    'PUBLISHED',
    NOW()
);
SET @p6 = LAST_INSERT_ID();

-- ── Project 7: The Grand Villa ─────────────────────────────
INSERT INTO projects
    (title, category, description, client, location, duration, year, area, budget, challenge, solution, image_url, status, created_at)
VALUES (
    'The Grand Villa',
    'Villa',
    'An opulent full-villa interior spanning ornate master suites, a private mandir of temple-grade grandeur, and artistically curated guest rooms — each executed at a level of craft that rivals the finest boutique hotels in India.\n\nThe master bedroom features a diamond-quilted headboard with a hand-stitched gold frame, a classic crystal chandelier, and floor-to-ceiling mirror panels flanked by warm stone cladding. Adjacent rooms introduce their own moods: a dark marble and gold art-deco suite; a rose-gold feminine bedroom with a jali-carved backlit panel; and a blue art-deco room with a sunburst mirror. The private mandir — dark granite walls, cascading brass diyas on chains, twin water kunds with lotus flowers, and a Ganesh idol beneath a hand-carved ceremonial canopy — anchors the spiritual heart of the home.',
    'Private Client',
    'Mira Road, Mumbai',
    '8 months',
    2025,
    '6,500 sq ft',
    '₹1.8–2.4 Crores',
    'Translating the client''s aspiration for a heritage-luxury bungalow across six distinct rooms — each with its own aesthetic identity — while maintaining coherence throughout a large, multi-floor property.',
    'A palette of champagne gold, warm walnut, and ivory was established as the architectural base across all rooms. This neutral scaffold allowed each space to introduce its own accent — rose gold, cobalt, terracotta, or obsidian — without clashing, united by consistent material quality and craftsmanship standards.',
    '/Images/IMG-20251207-WA0032.jpg',
    'PUBLISHED',
    NOW()
);
SET @p7 = LAST_INSERT_ID();


-- ============================================================
-- TEAM MEMBERS
-- ============================================================

INSERT INTO project_team_members (project_id, name, role) VALUES
(@p1, 'Priya Nair',       'Lead Interior Designer'),
(@p1, 'Rahul Deshmukh',   'Project Architect'),
(@p1, 'Sandeep Kamble',   'Site Supervisor');

INSERT INTO project_team_members (project_id, name, role) VALUES
(@p2, 'Ananya Sharma',    'Interior Designer'),
(@p2, 'Vikram Joshi',     'Architectural Consultant'),
(@p2, 'Manoj Patil',      'Site Supervisor');

INSERT INTO project_team_members (project_id, name, role) VALUES
(@p3, 'Deepa Menon',      'Lead Interior Designer'),
(@p3, 'Arjun Kulkarni',   'Project Architect');

INSERT INTO project_team_members (project_id, name, role) VALUES
(@p4, 'Pooja Rathod',     'Lead Interior Designer'),
(@p4, 'Nikhil Shetty',    'Architectural Consultant'),
(@p4, 'Suresh Waghmare',  'Site Supervisor');

INSERT INTO project_team_members (project_id, name, role) VALUES
(@p5, 'Kavita Iyer',      'Senior Interior Designer'),
(@p5, 'Rohan Mehta',      'Project Architect'),
(@p5, 'Dinesh Sawant',    'Site Supervisor');

INSERT INTO project_team_members (project_id, name, role) VALUES
(@p6, 'Aditya Kapoor',    'Commercial Design Lead'),
(@p6, 'Smita Parekh',     'Space Planning Architect'),
(@p6, 'Raju Shinde',      'Site Supervisor');

INSERT INTO project_team_members (project_id, name, role) VALUES
(@p7, 'Nidhi Bhatia',     'Principal Interior Designer'),
(@p7, 'Saurabh Rajput',   'Project Architect'),
(@p7, 'Govind Tambe',     'Senior Site Supervisor');


-- ============================================================
-- PROJECT IMAGES (gallery — all images per project)
-- Cover image is already in projects.image_url (sort_order=1).
-- ============================================================

INSERT INTO project_images (project_id, image_url, sort_order) VALUES
(@p1, '/Images/IMG-20251207-WA0017.jpg', 1),
(@p1, '/Images/IMG-20251207-WA0019.jpg', 2),
(@p1, '/Images/IMG-20251207-WA0023.jpg', 3),
(@p1, '/Images/IMG-20251207-WA0037.jpg', 4),
(@p1, '/Images/IMG-20251207-WA0018.jpg', 5),
(@p1, '/Images/IMG-20251207-WA0020.jpg', 6);

INSERT INTO project_images (project_id, image_url, sort_order) VALUES
(@p2, '/Images/IMG-20251207-WA0021.jpg', 1),
(@p2, '/Images/IMG-20251207-WA0022.jpg', 2);

INSERT INTO project_images (project_id, image_url, sort_order) VALUES
(@p3, '/Images/IMG-20251207-WA0027.jpg', 1);

INSERT INTO project_images (project_id, image_url, sort_order) VALUES
(@p4, '/Images/IMG-20251207-WA0029.jpg', 1),
(@p4, '/Images/IMG-20251207-WA0028.jpg', 2),
(@p4, '/Images/IMG-20251207-WA0031.jpg', 3),
(@p4, '/Images/IMG-20251207-WA0035.jpg', 4),
(@p4, '/Images/IMG-20251207-WA0026.jpg', 5);

INSERT INTO project_images (project_id, image_url, sort_order) VALUES
(@p5, '/Images/IMG-20251207-WA0030.jpg', 1),
(@p5, '/Images/IMG-20251207-WA0046.jpg', 2),
(@p5, '/Images/IMG-20251207-WA0041.jpg', 3),
(@p5, '/Images/IMG-20251207-WA0043.jpg', 4),
(@p5, '/Images/IMG-20251207-WA0049.jpg', 5),
(@p5, '/Images/IMG-20251207-WA0045.jpg', 6),
(@p5, '/Images/IMG-20251207-WA0048.jpg', 7),
(@p5, '/Images/IMG-20251207-WA0040.jpg', 8);

INSERT INTO project_images (project_id, image_url, sort_order) VALUES
(@p6, '/Images/IMG-20251207-WA0042.jpg', 1),
(@p6, '/Images/IMG-20251207-WA0047.jpg', 2),
(@p6, '/Images/IMG-20251207-WA0044.jpg', 3),
(@p6, '/Images/IMG-20251207-WA0051.jpg', 4);

INSERT INTO project_images (project_id, image_url, sort_order) VALUES
(@p7, '/Images/IMG-20251207-WA0032.jpg', 1),
(@p7, '/Images/IMG-20251207-WA0038.jpg', 2),
(@p7, '/Images/IMG-20251207-WA0039.jpg', 3),
(@p7, '/Images/IMG-20251207-WA0033.jpg', 4),
(@p7, '/Images/IMG-20251207-WA0036.jpg', 5),
(@p7, '/Images/IMG-20251207-WA0050.jpg', 6),
(@p7, '/Images/IMG-20251207-WA0034.jpg', 7);


-- ============================================================
-- REVIEWS (global — not FK-linked to projects per schema)
-- ============================================================

INSERT INTO reviews (author, role, location, rating, quote, active, created_at) VALUES

-- Project 1
('R. Krishnamurthy',        'Homeowner',              'Navi Mumbai',  5,
 'Casa Interior turned our builder-grade flat into something we are genuinely proud to show guests. The butterfly chandelier alone makes people stop and stare. Every detail was thought through.',
 TRUE, NOW()),
('Sonia & Anand Patel',     'Homeowners',             'Navi Mumbai',  5,
 'The teal and amber palette was exactly the bold-yet-liveable look we wanted. The team understood our brief from the very first meeting and never compromised on quality. Highly recommend.',
 TRUE, NOW()),
('Meghna Deshpande',        'Homeowner',              'Navi Mumbai',  5,
 'What impressed us most was how the bedroom felt so different from the living room yet everything felt part of the same home. That coherence is rare and priceless.',
 TRUE, NOW()),

-- Project 2
('Amit Gokhale',            'Homeowner',              'Thane',        5,
 'We wanted something calm and natural — this is exactly it. Every morning in this house feels like a weekend. The team patiently explained every material and paint choice to us.',
 TRUE, NOW()),
('Preethi Rao',             'Homeowner',              'Thane',        4,
 'Loved the Scandinavian feel — very different from the typical Indian apartment look. A few minor delays, but the final result absolutely justified the wait.',
 TRUE, NOW()),

-- Project 3
('Vikrant & Nandita Joshi', 'Villa Owners',           'Lonavala',     5,
 'Our weekend home feels like a boutique hotel now. The slatted teak wall completely changed the character of the room. Friends always assume we had it sourced from a luxury resort abroad.',
 TRUE, NOW()),

-- Project 4
('Rohit Bhosale',           'Homeowner',              'Navi Mumbai',  5,
 'Navy blue walls, leather sofa, that chandelier — our home now looks like something from a magazine. The team was bold where we were hesitant, and they were right every single time.',
 TRUE, NOW()),
('Priya Kulkarni',          'Homeowner',              'Navi Mumbai',  5,
 'Each bedroom tells its own story but they all feel like they belong together. The gold stripe detail in the feature wall is our favourite element — so understated yet so premium.',
 TRUE, NOW()),
('Abhishek Shinde',         'Homeowner',              'Kharghar',     4,
 'Excellent craftsmanship across the board. The dark palette was a risk we took together with the design team and we could not be happier. Would definitely engage them again.',
 TRUE, NOW()),

-- Project 5
('Suhas & Lata Joshi',      'Homeowners',             'Panvel',       5,
 'The mandir space brings tears to our eyes every morning — sacred, grand, and intimate all at once. And the kitchen is the most functional and beautiful we have ever had.',
 TRUE, NOW()),
('Neha Kadam',              'Homeowner',              'Panvel',       5,
 'From the foyer mirror to the bedroom wardrobes, every inch of this home was designed with purpose. The jali ceiling was the finishing touch that elevated everything. Exceptional work.',
 TRUE, NOW()),
('Rajan Desai',             'Homeowner',              'Navi Mumbai',  5,
 'Casa Interior managed a complex brief — Vastu, modular kitchen, traditional mandir, modern bedrooms — and delivered a home that feels completely seamless. A remarkable team.',
 TRUE, NOW()),

-- Project 6
('Sangeeta Menon',          'Director, Client Firm',  'Navi Mumbai',  5,
 'Our new office projects exactly the image our brand deserves. The boardroom impresses every client who walks in. Delivered on time, within budget, and with zero shortcuts.',
 TRUE, NOW()),
('Raj Thakur',              'Managing Partner',       'Belapur',      5,
 'I have been in many premium offices across Mumbai and Pune. This fit-out stands alongside the best of them. The 3D world map in my cabin is the centrepiece of every conversation I have.',
 TRUE, NOW()),
('Devika Inamdar',          'HR Head, Client Firm',   'Navi Mumbai',  4,
 'Our employees love the new space. The collaborative lounge has genuinely changed how teams interact. Great attention to both the aesthetic and the functional — rare in commercial projects.',
 TRUE, NOW()),

-- Project 7
('Harish & Sunita Agarwal', 'Villa Owners',           'Mumbai',       5,
 'The Grand Villa is our life''s work made physical. Casa Interior understood that immediately. The mandir alone is worth every rupee — it is the spiritual heart of our home, and it is perfect.',
 TRUE, NOW()),
('Kaveri Malhotra',         'Villa Owner',            'Mumbai',       5,
 'Eight months of construction and not a single day of frustration with the design team. They held our vision even when we lost confidence in it. The master suite is extraordinary.',
 TRUE, NOW()),
('Prashant Nair',           'Homeowner',              'Mira Road',    5,
 'We visited the property after the handover and stood in silence for a full minute. That says everything. The dark marble bedroom with the study nook is beyond anything we had imagined.',
 TRUE, NOW());
