// main.js — small, dependency-free scripts for nav and form validation
document.addEventListener('DOMContentLoaded', function () {
  // Update copyright year
  const y = new Date().getFullYear();
  document.querySelectorAll('#year').forEach(el => el.textContent = y);

  // Mobile nav toggle
  const menuToggle = document.getElementById('menu-toggle');
  const siteNav = document.getElementById('site-nav');
  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      siteNav.classList.toggle('show');
    });
  }

  // Simple form validation and fake submit (no backend)
  const form = document.getElementById('contact-form');
  if (form) {
    const status = document.getElementById('form-status');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = '';

      // Basic HTML5 constraint check
      if (!form.checkValidity()) {
        status.textContent = 'Please complete the form correctly.';
        status.style.color = 'crimson';
        return;
      }

      // Simulate sending
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // fake network delay
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send';
        form.reset();
        status.textContent = 'Thanks — your message was sent (demo).';
        status.style.color = 'green';
      }, 900);
    });
  }
});
