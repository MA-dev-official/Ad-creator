/**
 * ============================================================
 * MAIN ENTRY POINT — js/main.js
 * Muhammad Ahmad — AI Ads Creator Portfolio
 * ============================================================
 * This file bootstraps the entire application:
 *   1. Preloader animation
 *   2. Lenis smooth scroll
 *   3. GSAP scroll animations
 *   4. Hero animations & canvas particles
 *   5. Projects rendering & filtering
 *   6. Testimonials slider
 *   7. Contact form
 *   8. Navigation (mobile toggle, active states)
 *   9. Footer year
 * ============================================================
 */

import {
  initLenis,
  animatePreloader,
  animateHero,
  initHeroCanvas,
  initTitleRotation,
  initCounters,
  initScrollAnimations,
  initNavbar,
  initActiveNav,
} from "./animations.js";

import { renderProjects, initFilters, initModal } from "./filters.js";
import { initTestimonials } from "./testimonials.js";

// ─── BOOT ────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Set footer year
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 1. Animate preloader, then boot everything else
  animatePreloader(() => {
    // 2. Lenis smooth scroll
    initLenis();

    // 3. Hero animations
    animateHero();
    initHeroCanvas();
    initTitleRotation();

    // 4. Navbar
    initNavbar();
    initActiveNav();

    // 5. Scroll animations (sections fade in as you scroll)
    initScrollAnimations();

    // 6. Counters
    initCounters();

    // 7. Projects section
    renderProjects("All Projects");
    initFilters();
    initModal();

    // 8. Testimonials
    initTestimonials();

    // 9. Contact form
    initContactForm();

    // 10. Mobile navigation
    initMobileNav();
  });
});

// ─── CONTACT FORM ────────────────────────────────────────────
function initContactForm() {
  const form   = document.getElementById("contactForm");
  const formOk = document.getElementById("formOk");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic validation
    const name    = form.querySelector("#cName");
    const email   = form.querySelector("#cEmail");
    const message = form.querySelector("#cMsg");

    if (!name?.value.trim() || !email?.value.trim() || !message?.value.trim()) {
      // Shake invalid fields
      [name, email, message].forEach((field) => {
        if (field && !field.value.trim()) {
          field.style.borderColor = "rgba(255,80,80,0.5)";
          field.addEventListener("input", () => {
            field.style.borderColor = "";
          }, { once: true });
        }
      });
      return;
    }

    const btn = form.querySelector("button[type='submit']");
    if (btn) {
      btn.disabled = true;
      btn.querySelector("span").textContent = "Sending...";
    }

    // Simulate sending (replace with real backend/email service when ready)
    setTimeout(() => {
      form.reset();
      if (btn) {
        btn.disabled = false;
        btn.querySelector("span").textContent = "Send Message";
      }
      if (formOk) {
        formOk.style.display = "block";
        setTimeout(() => { formOk.style.display = "none"; }, 5000);
      }
    }, 1200);
  });
}

// ─── MOBILE NAVIGATION ───────────────────────────────────────
function initMobileNav() {
  const toggle   = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (!toggle || !navLinks) return;

  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("mobile-open");
    toggle.classList.toggle("active", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("mobile-open");
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });

  // Close nav on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("mobile-open")) {
      navLinks.classList.remove("mobile-open");
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
      toggle.focus();
    }
  });
}
