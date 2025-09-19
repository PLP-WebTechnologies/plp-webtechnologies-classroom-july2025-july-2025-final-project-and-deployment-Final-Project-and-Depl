// js/main.js
// Professional main script for Samson Thuo portfolio
// Use as: <script type="module" src="js/main.js"></script>

const App = (() => {
  'use strict';

  /* -------------------------
     Utility helpers
  ------------------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const on = (el, ev, fn) => el && el.addEventListener(ev, fn);
  const exists = sel => !!document.querySelector(sel);

  /* -------------------------
     Menu toggle (hamburger)
     Adds aria-expanded and toggles nav visibility
  ------------------------- */
  function initMenuToggle() {
    const btn = $('.menu-toggle');
    const nav = $('.nav-links') || $('.navbar nav ul');

    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
      // for accessibility move focus into nav when opened
      if (!expanded) {
        const firstLink = nav.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });
  }

  /* -------------------------
     Active link highlighting
     Adds .active to the nav item that matches the path
  ------------------------- */
  function initActiveLinks() {
    const navLinks = $$('.nav-links a');
    if (!navLinks.length) return;
    const current = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      // normalize
      if (!href) return;
      const target = href.split('/').pop();
      if (target === current || (current === '' && href.includes('index'))) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  /* -------------------------
     Smooth Scroll for same-page anchors
  ------------------------- */
  function initSmoothScroll() {
    // only for internal links
    $$( 'a[href^="#"]' ).forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id.length === 1) return; // href="#"
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* -------------------------
     Scroll reveal using IntersectionObserver
     Adds .reveal-visible when element enters viewport
  ------------------------- */
  function initScrollReveal() {
    const items = $$('.reveal');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          // optional: unobserve after reveal for performance
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

    items.forEach(i => observer.observe(i));
  }

  /* -------------------------
     Lazy load images fallback with IntersectionObserver
  ------------------------- */
  function initLazyImages() {
    const lazyImgs = $$('img[data-src], picture[data-src]');
    if (!lazyImgs.length) return;

    const loadImage = el => {
      const src = el.dataset.src;
      if (!src) return;
      if (el.tagName.toLowerCase() === 'img') {
        el.src = src;
      } else {
        // e.g. picture or other
        el.style.backgroundImage = `url('${src}')`;
      }
      el.removeAttribute('data-src');
      el.classList.add('loaded');
    };

    if ('IntersectionObserver' in window) {
      const imgObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { rootMargin: '200px 0px' });

      lazyImgs.forEach(img => imgObs.observe(img));
    } else {
      // fallback: load all
      lazyImgs.forEach(loadImage);
    }
  }

  /* -------------------------
     Contact form client validation and netlify-friendly handling
  ------------------------- */
  function initContactForm() {
    const form = $('form[name="contact"]') || $('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      // basic validation
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const message = form.querySelector('[name="message"]');

      if (!name || !email || !message) return; // fields missing — let native behavior proceed

      const emailVal = email.value.trim();
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name.value.trim() || !re.test(emailVal) || !message.value.trim()) {
        e.preventDefault();
        alert('Please fill in your name, a valid email, and a message.');
        return;
      }

      // If deployed to Netlify, form will submit normally.
      // For demo locally, we can prevent the submit and show a confirmation.
      if (location.hostname === 'localhost' || location.protocol === 'file:') {
        e.preventDefault();
        // simulate a submission UX
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
          btn.disabled = true;
          btn.textContent = 'Sending...';
        }
        setTimeout(() => {
          if (btn) {
            btn.disabled = false;
            btn.textContent = 'Send Message';
          }
          alert('This is a demo run. Deploy to Netlify to capture real submissions.');
          form.reset();
        }, 900);
      }
    });
  }

  /* -------------------------
     Copy email to clipboard helper (useful on contact page)
  ------------------------- */
  function initCopyEmail() {
    const copyBtn = document.querySelector('[data-copy-email]');
    const emailLink = document.querySelector('[href^="mailto:"]');
    if (!copyBtn || !emailLink) return;

    copyBtn.addEventListener('click', async () => {
      const email = emailLink.getAttribute('href').replace('mailto:', '');
      try {
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => (copyBtn.textContent = 'Copy Email'), 1500);
      } catch (err) {
        // fallback for older browsers
        const el = document.createElement('textarea');
        el.value = email;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => (copyBtn.textContent = 'Copy Email'), 1500);
      }
    });
  }

  /* -------------------------
     Dynamic blog loading: load /blog/posts.json
     Posts JSON example:
     [
       {
         "title": "My Journey at PLP",
         "slug": "post1.html",
         "summary": "From zero to confident...",
         "image": "../images/plp-journey.jpg",
         "date": "2025-09-18"
       }
     ]
  ------------------------- */
  async function initBlogLoader() {
    const grid = document.querySelector('.blog-grid');
    if (!grid) return;

    const jsonPath = '/blog/posts.json';
    try {
      const res = await fetch(jsonPath, { cache: 'no-store' });
      if (!res.ok) {
        // no posts.json — nothing to do
        console.info('No posts.json found, static HTML will be used.');
        return;
      }
      const posts = await res.json();
      grid.innerHTML = ''; // clear existing

      posts.forEach(p => {
        const article = document.createElement('article');
        article.className = 'blog-card reveal';
        // use data-src for lazy-loading images
        const img = document.createElement('img');
        img.setAttribute('data-src', p.image || '../images/placeholder.jpg');
        img.alt = p.title;
        img.loading = 'lazy';

        const content = document.createElement('div');
        content.className = 'blog-card-content';
        content.innerHTML = `
          <h2>${escapeHtml(p.title)}</h2>
          <p>${escapeHtml(p.summary)}</p>
          <a href="${p.slug}">Read More</a>
        `;

        article.appendChild(img);
        article.appendChild(content);
        grid.appendChild(article);
      });

      // after injecting, init lazy loader and reveal
      initLazyImages();
      initScrollReveal();

    } catch (err) {
      console.error('Error loading blog posts:', err);
    }
  }

  // small safe escaper
  function escapeHtml(str = '') {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /* -------------------------
     Initialize everything on DOMContentLoaded
  ------------------------- */
  function init() {
    document.addEventListener('DOMContentLoaded', () => {
      initMenuToggle();
      initActiveLinks();
      initSmoothScroll();
      initScrollReveal();
      initLazyImages();
      initContactForm();
      initCopyEmail();
      initBlogLoader();
      console.info('App initialized');
    });
  }

  return { init };
})();

App.init();
