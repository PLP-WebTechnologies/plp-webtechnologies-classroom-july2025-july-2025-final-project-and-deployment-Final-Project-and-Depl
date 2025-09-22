// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  siteNav.classList.toggle('open');
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form validation
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();
    let ok = true;
    if (name.length < 2) { ok = false; alert('Please enter your name.'); }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { ok = false; alert('Please enter a valid email address.'); }
    if (message.length < 10) { ok = false; alert('Message must be at least 10 characters.'); }
    if (ok) {
      form.reset();
      alert('Thanks — your message has been sent (demo).');
    }
  });
}
initContactForm();
