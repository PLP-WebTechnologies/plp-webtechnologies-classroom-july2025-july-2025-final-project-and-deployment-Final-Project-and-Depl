/* js/script.js
   Interactivity: menu toggle, carousel, toast, form validation,
   demonstrates functions with params/returns, loops, DOM interactions
*/

/* ---------- Variables & state ---------- */
const slides = [
  "images/yofs-logo.jpg",
  "images/yofs-logo.jpg",
  "images/yofs-logo.jpg"
];
let currentSlide = 0;
let carouselEl, carouselImgEl, toastEl;

/* ---------- Utility functions (parameters + returns) ---------- */

/**
 * clampIndex: ensures an index wraps inside array length
 * @param {number} idx
 * @param {number} len
 * @returns {number} wrapped index
 */
function clampIndex(idx, len) {
  return ((idx % len) + len) % len;
}

/**
 * showToast: shows a temporary toast message
 * @param {string} message
 * @param {number} ms
 * @returns {void}
 */
function showToast(message, ms = 2200) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("show");
  setTimeout(() => toastEl.classList.remove("show"), ms);
}

/* ---------- Carousel controls (DOM + animation trigger) ---------- */

/**
 * updateCarousel: sets image src and fade animation
 * @param {number} idx
 * @returns {number} current displayed index
 */
function updateCarousel(idx) {
  const len = slides.length;
  currentSlide = clampIndex(idx, len);
  // fade transition via CSS opacity on img - here we replace src with small crossfade trick
  carouselImgEl.style.opacity = 0;
  setTimeout(() => {
    carouselImgEl.src = slides[currentSlide];
    carouselImgEl.style.opacity = 1;
  }, 360);
  return currentSlide;
}

function nextSlide() { updateCarousel(currentSlide + 1); }
function prevSlide() { updateCarousel(currentSlide - 1); }

/* ---------- Menu toggle (mobile) ---------- */
function toggleMenu() {
  const nav = document.getElementById("mainNav");
  const btn = document.getElementById("menuToggle");
  const expanded = btn.getAttribute("aria-expanded") === "true";
  btn.setAttribute("aria-expanded", String(!expanded));
  if (nav.style.display === "flex") {
    nav.style.display = "";
  } else {
    nav.style.display = "flex";
    nav.style.flexDirection = "column";
    nav.style.gap = "10px";
    nav.style.position = "absolute";
    nav.style.right = "18px";
    nav.style.top = "70px";
    nav.style.background = "rgba(10,20,40,0.95)";
    nav.style.padding = "12px";
    nav.style.borderRadius = "8px";
  }
}

/* ---------- Form validation & submit ---------- */
function validateContactForm(form) {
  const name = form.fullName.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const service = form.service.value;

  if (name.length < 3) return { ok: false, msg: "Name must be at least 3 characters" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, msg: "Please enter a valid email" };
  if (!/^(?:07\d{8}|01\d{8}|254\d{9}|\+2547\d{8})$/.test(phone)) return { ok: false, msg: "Enter a valid Kenyan phone" };
  if (!service) return { ok: false, msg: "Choose a service" };
  return { ok: true, msg: "Validation passed" };
}

/* ---------- Initialization & wiring ---------- */
document.addEventListener("DOMContentLoaded", () => {
  carouselEl = document.querySelector(".carousel");
  carouselImgEl = document.getElementById("carouselImg");
  toastEl = document.getElementById("toast");

  // populate applications list on index if present
  const appsList = document.getElementById("appsList");
  const initialApps = ["Recommendation Systems", "Image Recognition", "Fraud Detection", "Predictive Maintenance"];
  if (appsList) {
    initialApps.forEach(app => {
      const li = document.createElement("li");
      li.textContent = app;
      appsList.appendChild(li);
    });
  }

  // carousel buttons
  const nextBtn = document.getElementById("nextSlide");
  const prevBtn = document.getElementById("prevSlide");
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  // auto-play carousel
  setInterval(nextSlide, 4000);

  // menu toggle
  const menuToggle = document.getElementById("menuToggle");
  if (menuToggle) menuToggle.addEventListener("click", toggleMenu);

  // wire up toast on CTA clicks
  document.querySelectorAll(".btn").forEach(b => {
    b.addEventListener("click", (e) => {
      if (b.classList.contains("primary")) showToast("Thanks — we'll contact you soon!");
    });
  });

  // contact form validation wiring
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const result = validateContactForm(contactForm);
      if (!result.ok) {
        showToast(result.msg, 3000);
        return;
      }
      // simulate successful send
      showToast("Message sent — thank you!");
      contactForm.reset();
    });
  }

  // enable keyboard toggling for cards on about/services pages
  document.querySelectorAll(".service-card, .card, .type-card").forEach((el) => {
    el.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        showToast("Selected: " + (el.querySelector("h3")?.textContent || el.querySelector("h2")?.textContent || "item"));
      }
    });
  });

  // set initial carousel image
  updateCarousel(0);
});
