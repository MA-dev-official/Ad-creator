/**
 * ============================================================
 * PROJECT FILTERS — js/filters.js
 * ============================================================
 * Renders project cards and handles category filtering.
 * All filtering is done in Vanilla JavaScript — no libraries.
 *
 * HOW TO ADD NEW PROJECTS:
 *   → Edit the projects array in js/projects.js only.
 *   → No changes needed in this file.
 *
 * HOW TO ADD A NEW FILTER CATEGORY:
 *   1. Add a new <button class="filter-btn" data-filter="Category Name"> in index.html
 *   2. Use the same "Category Name" string in a project's "category" field in projects.js
 * ============================================================
 */

import { projects } from "./projects.js";
import { animateProjectCards } from "./animations.js";

const grid      = document.getElementById("projectsGrid");
const emptyMsg  = document.getElementById("projectsEmpty");
const filterBar = document.querySelector(".filter-bar");

// ─── RENDER A SINGLE PROJECT CARD ───────────────────────────
function createCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `Play ${project.title}`);
  card.dataset.category = project.category;
  card.dataset.video     = project.video || "";
  card.dataset.title     = project.title;
  card.dataset.desc      = project.description;
  card.dataset.cat       = project.category;

  // Thumbnail area
  let thumbContent = "";
  if (project.thumbnail) {
    // Real thumbnail image (lazy loaded)
    thumbContent = `
      <img
        src="${project.thumbnail}"
        alt="${project.title} thumbnail"
        loading="lazy"
        onerror="this.parentElement.innerHTML='<div class=\\'thumb-placeholder\\'><div class=\\'thumb-placeholder-text\\'>${project.category}</div></div>'"
      />
    `;
  } else {
    // Styled placeholder when no thumbnail provided yet
    thumbContent = `
      <div class="thumb-placeholder">
        <div class="thumb-placeholder-text">${project.category}</div>
      </div>
    `;
  }

  card.innerHTML = `
    <div class="card-thumb">
      ${thumbContent}
      <div class="card-overlay" aria-hidden="true">
        <div class="play-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 4l12 6-12 6V4z" fill="#000"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="card-info">
      <div class="card-category">${project.category}</div>
      <h3 class="card-title">${project.title}</h3>
      <p class="card-desc">${project.description}</p>
    </div>
  `;

  return card;
}

// ─── RENDER ALL CARDS ────────────────────────────────────────
export function renderProjects(filter = "All Projects") {
  if (!grid) return;
  grid.innerHTML = "";

  const filtered = filter === "All Projects"
    ? projects
    : projects.filter((p) => p.category === filter);

  if (filtered.length === 0) {
    if (emptyMsg) emptyMsg.style.display = "block";
    grid.style.display = "none";
    return;
  }

  if (emptyMsg) emptyMsg.style.display = "none";
  grid.style.display = "";

  filtered.forEach((project) => {
    const card = createCard(project);
    grid.appendChild(card);

    // Click / keyboard handler → open modal
    card.addEventListener("click", () => openModal(project));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(project);
      }
    });
  });

  // Animate cards after render
  animateProjectCards();
}

// ─── FILTER BUTTON LOGIC ─────────────────────────────────────
export function initFilters() {
  if (!filterBar) return;

  const buttons = filterBar.querySelectorAll(".filter-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active state
      buttons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      // Re-render with new filter
      renderProjects(btn.dataset.filter);
    });
  });
}

// ─── VIDEO MODAL ─────────────────────────────────────────────
const modal       = document.getElementById("videoModal");
const modalVideo  = document.getElementById("modalVideo");
const modalTitle  = document.getElementById("modalTitle");
const modalDesc   = document.getElementById("modalDesc");
const modalCat    = document.getElementById("modalCat");
const modalClose  = document.getElementById("modalClose");
const modalBdrop  = document.getElementById("modalBackdrop");

function openModal(project) {
  if (!modal) return;

  // Populate info
  if (modalTitle) modalTitle.textContent = project.title;
  if (modalDesc)  modalDesc.textContent  = project.description;
  if (modalCat)   modalCat.textContent   = project.category;

  // Set video source — show loading spinner while buffering
  if (modalVideo) {
    if (project.video) {
      modalVideo.style.display = "";

      // Show spinner until video can play
      const wrap = modalVideo.closest(".modal-video-wrap");
      if (wrap) wrap.classList.add("loading");

      // Remove old listeners to avoid stacking
      const onCanPlay = () => {
        if (wrap) wrap.classList.remove("loading");
        modalVideo.play().catch(() => {});
        modalVideo.removeEventListener("canplay", onCanPlay);
      };
      const onError = () => {
        if (wrap) wrap.classList.remove("loading");
        modalVideo.removeEventListener("error", onError);
      };

      modalVideo.addEventListener("canplay", onCanPlay);
      modalVideo.addEventListener("error", onError);

      modalVideo.src = project.video;
      modalVideo.preload = "auto";
      modalVideo.load();
    } else {
      modalVideo.src = "";
      modalVideo.style.display = "none";
    }
  }

  // Show modal
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";

  requestAnimationFrame(() => {
    modal.classList.add("open");
  });

  modalClose?.focus();
}

export function closeModal() {
  if (!modal) return;

  modal.classList.remove("open");

  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = "";

    if (modalVideo) {
      modalVideo.pause();
      modalVideo.src = "";
    }
  }, 400);
}

// ─── MODAL EVENT LISTENERS ───────────────────────────────────
export function initModal() {
  if (!modal) return;

  // Close button
  modalClose?.addEventListener("click", closeModal);

  // Backdrop click
  modalBdrop?.addEventListener("click", closeModal);

  // ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeModal();
    }
  });
}
