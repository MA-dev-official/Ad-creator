/**
 * ============================================================
 * PROJECTS DATA — js/projects.js
 * ============================================================
 *
 * HOW TO ADD A NEW PROJECT:
 * 1. Upload your thumbnail image to: assets/thumbnails/your-image.jpg
 * 2. Upload your video file to:      assets/videos/your-video.mp4
 * 3. Copy the template object below and fill in the fields:
 *
 * {
 *   title: "Your Project Title",
 *   category: "Perfume Ads",          ← must match a filter button exactly
 *   description: "Short description of this project.",
 *   thumbnail: "assets/thumbnails/your-image.jpg",
 *   video: "assets/videos/your-video.mp4"
 * }
 *
 * 4. Paste it inside the projects array below.
 *    No HTML changes needed — the website renders automatically!
 *
 * AVAILABLE CATEGORIES (must match exactly):
 *   "Perfume Ads"
 *   "Product Commercials"
 *   "Social Media Ads"
 *   "Brand Promotions"
 *   "AI Marketing Videos"
 *
 * ============================================================
 */

export const projects = [
  // ─── EXAMPLE PROJECTS ────────────────────────────────────────
  // Remove or replace these once you have real projects.
  // Leave thumbnail/video fields empty to show a styled placeholder.

  {
    title: "Eternal Noir — Luxury Perfume Campaign",
    category: "Perfume Ads",
    description: "A cinematic AI-generated perfume commercial featuring deep atmospheric visuals and luxury storytelling.",
    thumbnail: "", // Add: "assets/thumbnails/perfume-noir.jpg"
    video: ""      // Add: "assets/videos/perfume-noir.mp4"
  },
  {
    title: "Lumière Gold — Fragrance Commercial",
    category: "Perfume Ads",
    description: "Premium gold-themed fragrance advertisement with fluid particle effects and luxury product presentation.",
    thumbnail: "",
    video: ""
  },
  {
    title: "Obsidian Watch — Product Commercial",
    category: "Product Commercials",
    description: "High-end watch commercial featuring macro cinematic shots and luxury brand aesthetics.",
    thumbnail: "",
    video: ""
  },
  {
    title: "Crystal Serum — Skincare Ad",
    category: "Product Commercials",
    description: "Premium skincare product commercial with clean visuals and compelling benefit storytelling.",
    thumbnail: "",
    video: ""
  },
  {
    title: "Velocity Shoes — Instagram Reel Ad",
    category: "Social Media Ads",
    description: "Dynamic footwear advertisement optimized for Instagram and TikTok — fast-cut, visually punchy.",
    thumbnail: "",
    video: ""
  },
  {
    title: "Bloom Cosmetics — TikTok Campaign",
    category: "Social Media Ads",
    description: "Vertical-format social media ads for a cosmetics brand targeting Gen Z audiences.",
    thumbnail: "",
    video: ""
  },
  {
    title: "Apex Motors — Brand Film",
    category: "Brand Promotions",
    description: "Cinematic brand identity video for a luxury automotive company showcasing prestige and power.",
    thumbnail: "",
    video: ""
  },
  {
    title: "Heritage Leather — Brand Story",
    category: "Brand Promotions",
    description: "Premium leather goods brand promotion video with artisan storytelling and warm aesthetic.",
    thumbnail: "",
    video: ""
  },
  {
    title: "NovaTech — Product Launch Campaign",
    category: "AI Marketing Videos",
    description: "Full AI-generated marketing campaign video for a tech product launch, from teaser to reveal.",
    thumbnail: "",
    video: ""
  },
  {
    title: "Pure Glow — E-Commerce Product Ad",
    category: "AI Marketing Videos",
    description: "Conversion-focused product advertisement designed for online store sales pages and digital campaigns.",
    thumbnail: "",
    video: ""
  },
];
