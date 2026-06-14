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
    title: "Parisbelle NAJRAH Perfume Ad",
    category: "Perfume Ads",
    description: "Luxury AI-generated fragrance advertisement for Najrah, designed with elegant cinematic visuals, premium scent storytelling, and high-end branding aesthetic to enhance social media marketing impact.",
    thumbnail: "assets/thumbnails/perfume2.jpg", // Add: "assets/thumbnails/perfume-noir.jpg"
    video: "assets/videos/perfume2.mp4"      // Add: "assets/videos/perfume-noir.mp4"
  },{
    title: "Parisbelle Honey Tabac Perfume Ad",
    category: "Perfume Ads",
    description: "Premium AI-generated perfume advertisement for Parisbelle Honey Tabac, focusing on luxury fragrance branding, warm honey-tobacco scent aesthetic, and cinematic product presentation designed for high-end social media marketing.",
    thumbnail: "assets/thumbnails/perfume.jpg", // Add: "assets/thumbnails/perfume-noir.jpg"
    video: "assets/videos/perfume.mp4"      // Add: "assets/videos/perfume-noir.mp4"
  },{
    title: "Queteeco Cosmetics Lip Gloss – Flirty Lips",
    category: "Product Commercials",
    description: "Premium AI-generated lip gloss advertisement designed for Queteeco Cosmetics, highlighting glossy texture, vibrant finish, and beauty-focused commercial styling for social media marketing.",
    thumbnail: "assets/thumbnails/LipGloss.jpg", // Add: "assets/thumbnails/perfume-noir.jpg"
    video: "assets/videos/LipGloss.mp4"      // Add: "assets/videos/perfume-noir.mp4"
  },{
    title: "Gluta-Hya Beauty Cream Ad",
    category: "Product Commercials",
    description: "AI-generated cosmetic product advertisement featuring premium product visuals, image-to-video animation, and commercial-style editing for social media marketing.",
    thumbnail: "assets/thumbnails/beuatycream.jpg", // Add: "assets/thumbnails/perfume-noir.jpg"
    video: "assets/videos/beautycream.mp4"      // Add: "assets/videos/perfume-noir.mp4"
  }
];
