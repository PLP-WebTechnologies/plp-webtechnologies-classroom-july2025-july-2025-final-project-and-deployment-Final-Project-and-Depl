/* script.js — mobile nav, sample data injection, form validation, counters, filtering */

document.addEventListener('DOMContentLoaded', () => {
  // header year fields
  [...document.querySelectorAll('[id^="year"]')].forEach(el => el.textContent = new Date().getFullYear());

  // mobile nav toggles
  const toggles = document.querySelectorAll('.nav-toggle');
  toggles.forEach(t => {
    t.addEventListener('click', () => {
      const nav = t.previousElementSibling; // expects nav to be just before button in markup
      if (nav) nav.classList.toggle('open');
      t.setAttribute('aria-expanded', nav && nav.classList.contains('open') ? 'true' : 'false');
    });
  });

  // sample projects data (for demo)
  const sampleProjects = [
    { id:1, title:'Coastal Mangrove Restoration', type:'reforestation', location:'Kenya', co2:12000, status:'Active' },
    { id:2, title:'Rooftop Solar Microgrid', type:'renewable', location:'Ghana', co2:8000, status:'Pipeline' },
    { id:3, title:'Cookstove Efficiency Program', type:'avoidance', location:'Nepal', co2:4000, status:'Active' },
    { id:4, title:'Savanna Rewilding', type:'reforestation', location:'Tanzania', co2:15000, status:'Active' }
  ];

  function createProjectCard(p) {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('data-type', p.type);
    card.innerHTML = `
      <div class="meta">${p.location} • ${p.status}</div>
      <h3>${escapeHtml(p.title)}</h3>
      <p class="small">Estimated tCO₂e: <strong>${p.co2.toLocaleString()}</strong></p>
      <p><a class="btn small" href="contact.html">Request Info</a></p>
    `;
    return card;
  }

  // populate featured project section on index
  const grid = document.getElementById('project-grid');
  if (grid) {
    sampleProjects.slice(0,3).forEach(p => grid.appendChild(createProjectCard(p)));
  }

  // populate projects page
  const projectsList = document.getElementById('projects-list');
  if (projectsList) {
    sampleProjects.forEach(p => projectsList.appendChild(createProjectCard(p)));
  }

  // filters
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(x => x.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter;
      Array.from(document.querySelectorAll('.project-card')).forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.type === filter) ? '' : 'none';
      });
    });
  });

  // gallery placeholders
  const gallery = document.getElementById('gallery-grid');
  if (gallery) {
    for (let i=1;i<=8;i++) {
      const d = document.createElement('div');
      d.className = 'img';
      d.textContent = `Image ${i}`;
      gallery.appendChild(d);
    }
  }

  // counters (simple animate)
  const counters = [
    { id: 'counter-co2', value: 370000 },
    { id: 'counter-projects', value: 24 },
    { id: 'counter-communities', value: 18 }
  ];
  counters.forEach(c => animateCounter(c.id, c.value, 1500));

  // forms: newsletter & contact
  const nlForm = document.getElementById('newsletter-form');
  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('nl-email');
      const msg = document.getElementById('nl-msg');
      if (!email.value || !/^\S+@\S+\.\S+$/.test(email.value)) {
        msg.textContent = 'Please enter a valid email.';
        msg.style.color = '#b33';
        return;
      }
      // simulate async subscribe (client-only)
      msg.textContent = 'Thanks! You are subscribed.';
      msg.style.color = '#064';
      nlForm.reset();
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      const out = document.getElementById('contact-msg');
      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        out.textContent = 'Please fill all required fields.';
        out.style.color = '#b33';
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        out.textContent = 'Enter a valid email.';
        out.style.color = '#b33';
        return;
      }
      // client-side success (replace with real backend)
      out.textContent = 'Message sent. We will contact you soon.';
      out.style.color = '#064';
      contactForm.reset();
    });
  }

  // Helper functions
  function animateCounter(id, to, duration=1200) {
    const el = document.getElementById(id);
    if (!el) return;
    const start = 0;
    const startTime = performance.now();
    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * (to - start) + start);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  }
});
