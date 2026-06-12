/**
 * ============================================================
 * TESTIMONIALS SLIDER — js/testimonials.js
 * Built with pure Vanilla JavaScript — no external slider library.
 * Features: auto-slide, manual controls, swipe support.
 *
 * HOW TO MODIFY TESTIMONIALS:
 *   Edit the TESTIMONIALS array below.
 *   Each object needs: quote, author, title, company.
 * ============================================================
 */

// ─── TESTIMONIAL DATA ────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "Muhammad's AI advertisement work is unlike anything I've seen at this price point. The perfume commercial he created for us looked like it was shot by a major agency. Our engagement rate doubled.",
    author: "Sarah Al-Farsi",
    title: "Brand Director",
    company: "Maison Nour Fragrances",
  },
  {
    quote: "The product commercial he delivered for our skincare launch was breathtaking. AI-generated, yet it looked completely cinematic. Our conversion rate increased by 35% after we started running it.",
    author: "James Whitmore",
    title: "E-Commerce Manager",
    company: "Luminary Skincare",
  },
  {
    quote: "We needed social media ads fast for our product launch. Muhammad delivered 6 complete video ads in under a week — all polished, brand-aligned, and performing exceptionally well on Instagram.",
    author: "Priya Mehta",
    title: "Marketing Lead",
    company: "Aura Beauty",
  },
  {
    quote: "Exceptional AI prompt engineering and commercial direction. The brand film he created captured our company identity better than traditional agency work we'd done before — at a fraction of the cost.",
    author: "Daniel Park",
    title: "CEO",
    company: "Apex Ventures",
  },
  {
    quote: "I was skeptical about AI-generated advertisements, but Muhammad's work completely changed my perspective. The luxury perfume ad he made for us is now our best-performing content across all platforms.",
    author: "Amira Hassan",
    title: "Creative Director",
    company: "Golden Oud Collection",
  },
];

// ─── SLIDER STATE ────────────────────────────────────────────
let current     = 0;
let autoTimer   = null;
let touchStartX = 0;
const AUTO_INTERVAL = 5000;

const slider = document.getElementById("testimonialsSlider");
const dots   = document.getElementById("tDots");
const prev   = document.getElementById("tPrev");
const next   = document.getElementById("tNext");

// ─── RENDER SLIDES ───────────────────────────────────────────
function renderSlides() {
  if (!slider) return;
  slider.innerHTML = "";

  TESTIMONIALS.forEach((t, i) => {
    const initials = t.author.split(" ").map((n) => n[0]).join("").slice(0, 2);

    const slide = document.createElement("div");
    slide.className = `testimonial-slide ${i === 0 ? "active" : ""}`;
    slide.setAttribute("role", "tabpanel");
    slide.setAttribute("aria-label", `Testimonial ${i + 1} of ${TESTIMONIALS.length}`);

    slide.innerHTML = `
      <div class="testimonial-quote" aria-hidden="true">"</div>
      <blockquote class="testimonial-text">${t.quote}</blockquote>
      <div class="testimonial-author">
        <div class="author-avatar" aria-hidden="true">${initials}</div>
        <div>
          <div class="author-name">${t.author}</div>
          <div class="author-role">${t.title}, ${t.company}</div>
        </div>
      </div>
    `;

    slider.appendChild(slide);
  });
}

// ─── RENDER DOTS ─────────────────────────────────────────────
function renderDots() {
  if (!dots) return;
  dots.innerHTML = "";

  TESTIMONIALS.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = `t-dot ${i === 0 ? "active" : ""}`;
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
    dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
    dot.addEventListener("click", () => goTo(i));
    dots.appendChild(dot);
  });
}

// ─── NAVIGATE TO SLIDE ───────────────────────────────────────
function goTo(index) {
  const slides    = slider?.querySelectorAll(".testimonial-slide");
  const dotEls    = dots?.querySelectorAll(".t-dot");
  if (!slides || !dotEls) return;

  // Remove active from current
  slides[current]?.classList.remove("active");
  dotEls[current]?.classList.remove("active");
  dotEls[current]?.setAttribute("aria-selected", "false");

  // Set new current
  current = (index + TESTIMONIALS.length) % TESTIMONIALS.length;

  slides[current]?.classList.add("active");
  dotEls[current]?.classList.add("active");
  dotEls[current]?.setAttribute("aria-selected", "true");
}

// ─── AUTO SLIDE ──────────────────────────────────────────────
function startAuto() {
  stopAuto();
  autoTimer = setInterval(() => goTo(current + 1), AUTO_INTERVAL);
}

function stopAuto() {
  if (autoTimer) {
    clearInterval(autoTimer);
    autoTimer = null;
  }
}

// ─── SWIPE SUPPORT ───────────────────────────────────────────
function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].clientX;
}

function handleTouchEnd(e) {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    stopAuto();
    goTo(diff > 0 ? current + 1 : current - 1);
    startAuto();
  }
}

// ─── INITIALIZE ──────────────────────────────────────────────
export function initTestimonials() {
  if (!slider) return;

  renderSlides();
  renderDots();
  startAuto();

  // Manual prev / next
  prev?.addEventListener("click", () => {
    stopAuto();
    goTo(current - 1);
    startAuto();
  });

  next?.addEventListener("click", () => {
    stopAuto();
    goTo(current + 1);
    startAuto();
  });

  // Swipe support (touch devices)
  slider.addEventListener("touchstart", handleTouchStart, { passive: true });
  slider.addEventListener("touchend",   handleTouchEnd,   { passive: true });

  // Pause auto on hover
  slider.addEventListener("mouseenter", stopAuto);
  slider.addEventListener("mouseleave", startAuto);

  // Keyboard navigation
  slider.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft")  { stopAuto(); goTo(current - 1); startAuto(); }
    if (e.key === "ArrowRight") { stopAuto(); goTo(current + 1); startAuto(); }
  });
}
