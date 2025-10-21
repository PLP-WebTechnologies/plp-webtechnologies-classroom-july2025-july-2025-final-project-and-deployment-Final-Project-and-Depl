// script.js — handles mobile nav, footer year and a minimal contact form handler.

document.addEventListener('DOMContentLoaded', function () {
  // Add current year to footers
  const years = document.querySelectorAll('[id^="year"]');
  years.forEach(el => el.textContent = new Date().getFullYear());

  // Simple mobile nav toggles (works on each page with unique toggle IDs)
  const toggles = document.querySelectorAll('.nav-toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', function () {
      // find the nav tied to this button (aria-controls)
      const controls = btn.getAttribute('aria-controls');
      if (!controls) return;
      const nav = document.getElementById(controls);
      if (!nav) return;

      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      // toggle visible state using aria-hidden
      const visible = nav.getAttribute('aria-hidden') === 'false';
      nav.setAttribute('aria-hidden', String(!visible));
    });
  });

  // For accessibility: set aria-hidden default on mobile navs
  const primaryNavs = document.querySelectorAll('.primary-nav');
  primaryNavs.forEach(nav => {
    if (!nav.hasAttribute('aria-hidden')) nav.setAttribute('aria-hidden', 'true');
  });

  // Contact form: basic client-side validation & fake submit
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const feedback = document.getElementById('form-feedback');
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const message = form.querySelector('[name="message"]');

      // quick validation
      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        feedback.textContent = 'Please fill in the required fields.';
        feedback.style.color = 'crimson';
        return;
      }
      // basic email pattern
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        feedback.textContent = 'Please enter a valid email address.';
        feedback.style.color = 'crimson';
        return;
      }

      // simulate sending (replace with real endpoint integration)
      feedback.textContent = 'Sending…';
      feedback.style.color = '#444';

      // Simulate an asynchronous send (replace with fetch to backend)
      setTimeout(() => {
        feedback.textContent = 'Thank you — your message has been received. We will contact you shortly.';
        feedback.style.color = 'green';
        form.reset();
      }, 800);
    });
  }

  // Smooth scroll for internal links (progressive enhancement)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({behavior: 'smooth'});
        }
      }
    });
  });
});
