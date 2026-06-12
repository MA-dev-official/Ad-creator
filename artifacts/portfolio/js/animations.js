/**
 * ============================================================
 * ANIMATIONS — js/animations.js
 * ============================================================
 * Uses: GSAP (installed locally via npm: gsap)
 *       Lenis (installed locally via npm: @studio-freight/lenis)
 *
 * Animation philosophy: Luxury, Smooth, Professional, Cinematic.
 * No bounce, no flash, no excessive movement.
 * ============================================================
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ─── LENIS SMOOTH SCROLL SETUP ──────────────────────────────
let lenisInstance = null;

export function initLenis() {
  // Dynamic import to handle SSR safety
  import("lenis").then(({ default: Lenis }) => {
    lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Tick Lenis on every GSAP frame
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    // Disable GSAP's default lag smoothing to avoid conflicts
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after Lenis initializes
    lenisInstance.on("scroll", ScrollTrigger.update);
  }).catch(() => {
    // Fallback: if Lenis fails to load, animations still work
    console.warn("Lenis not available, falling back to native scroll.");
  });
}

export function getLenis() {
  return lenisInstance;
}

// ─── PRELOADER ANIMATION ────────────────────────────────────
export function animatePreloader(onComplete) {
  const progressBar = document.getElementById("preloaderProgress");
  const preloader   = document.getElementById("preloader");

  if (!preloader) { onComplete?.(); return; }

  // Animate the progress bar from 0 to 100%
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      if (progressBar) progressBar.style.width = "100%";

      // Fade out preloader after brief pause
      setTimeout(() => {
        gsap.to(preloader, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            preloader.classList.add("hidden");
            preloader.setAttribute("aria-hidden", "true");
            onComplete?.();
          },
        });
      }, 400);
    } else {
      if (progressBar) progressBar.style.width = `${progress}%`;
    }
  }, 80);
}

// ─── HERO ENTRANCE ANIMATIONS ───────────────────────────────
export function animateHero() {
  const tl = gsap.timeline({ delay: 0.2 });

  // Badge
  tl.to(".hero-badge", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    from: { y: 20 },
  }, 0);

  // Name — stagger each line
  tl.fromTo(".hero-name", {
    opacity: 0,
    y: 40,
    clipPath: "inset(0 0 100% 0)",
  }, {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    duration: 1.0,
    ease: "power4.out",
  }, 0.2);

  // Titles, headline, sub, CTAs — staggered
  const elements = [".hero-titles", ".hero-headline", ".hero-sub", ".hero-ctas", ".hero-scroll"];
  elements.forEach((selector, i) => {
    tl.to(selector, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: "power3.out",
    }, 0.4 + i * 0.12);
  });
}

// ─── HERO CANVAS PARTICLE EFFECT ────────────────────────────
export function initHeroCanvas() {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let W = canvas.width  = canvas.offsetWidth;
  let H = canvas.height = canvas.offsetHeight;
  let raf;

  // Particles
  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.25,
    vy: -Math.random() * 0.4 - 0.1,
    alpha: Math.random() * 0.5 + 0.1,
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach((p) => {
      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap
      if (p.y < -5)  p.y = H + 5;
      if (p.x < -5)  p.x = W + 5;
      if (p.x > W + 5) p.x = -5;

      // Draw
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
      ctx.fill();
    });

    raf = requestAnimationFrame(draw);
  }

  draw();

  // Resize handler
  const ro = new ResizeObserver(() => {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  });
  ro.observe(canvas.parentElement);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
  };
}

// ─── ROTATING TITLE TEXT ────────────────────────────────────
export function initTitleRotation() {
  const track  = document.getElementById("titlesTrack");
  if (!track) return;

  const items  = track.querySelectorAll(".title-item");
  if (!items.length) return;

  let current = 0;
  const total = items.length;

  setInterval(() => {
    current = (current + 1) % total;
    gsap.to(track, {
      y: -current * 28,
      duration: 0.7,
      ease: "power3.inOut",
    });
  }, 2800);
}

// ─── COUNTER ANIMATIONS ─────────────────────────────────────
export function initCounters() {
  const counters = document.querySelectorAll(".stat-num[data-count]");

  counters.forEach((el) => {
    const target = parseInt(el.dataset.count, 10);

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          { val: 0 },
          { val: target },
          {
            duration: 1.8,
            ease: "power2.out",
            onUpdate: function () {
              el.textContent = Math.round(this.targets()[0].val).toLocaleString();
            },
          }
        );
      },
    });
  });
}

// ─── SCROLL-TRIGGERED SECTION ANIMATIONS ────────────────────
export function initScrollAnimations() {
  // Generic fade-up for [data-gsap="fadeUp"]
  gsap.utils.toArray("[data-gsap='fadeUp']").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      }
    );
  });

  // Fade from left for [data-gsap="fadeLeft"]
  gsap.utils.toArray("[data-gsap='fadeLeft']").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      }
    );
  });

  // Fade from right for [data-gsap="fadeRight"]
  gsap.utils.toArray("[data-gsap='fadeRight']").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      }
    );
  });

  // Stagger service cards
  gsap.utils.toArray(".service-card").forEach((card, i) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: (i % 3) * 0.08,
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          once: true,
        },
      }
    );
  });

  // Stagger skill pills
  gsap.utils.toArray(".skill-pill").forEach((pill, i) => {
    gsap.fromTo(
      pill,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.5)",
        delay: (i % 8) * 0.05,
        scrollTrigger: {
          trigger: pill,
          start: "top 92%",
          once: true,
        },
      }
    );
  });

  // Timeline steps — stagger from left
  gsap.utils.toArray(".timeline-step").forEach((step, i) => {
    gsap.fromTo(
      step,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: i * 0.07,
        scrollTrigger: {
          trigger: step,
          start: "top 88%",
          once: true,
        },
      }
    );
  });

  // Stat cards
  gsap.utils.toArray(".stat-card").forEach((card, i) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: i * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          once: true,
        },
      }
    );
  });
}

// ─── NAVBAR SCROLL BEHAVIOR ─────────────────────────────────
export function initNavbar() {
  const header = document.querySelector(".nav-header");
  if (!header) return;

  ScrollTrigger.create({
    start: "top -80",
    end: "max",
    onUpdate: ({ progress }) => {
      header.classList.toggle("scrolled", progress > 0);
    },
  });
}

// ─── ACTIVE NAV LINK HIGHLIGHTING ───────────────────────────
export function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks  = document.querySelectorAll(".nav-link:not(.nav-link--cta)");

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => highlight(section.id),
      onEnterBack: () => highlight(section.id),
    });
  });

  function highlight(id) {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  }
}

// ─── PROJECT CARD ENTRANCE (called after grid render) ───────
export function animateProjectCards() {
  gsap.utils.toArray(".project-card").forEach((card, i) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
        delay: i * 0.06,
      }
    );
  });
}
