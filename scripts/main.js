// DOM helpers
const nav = document.getElementById('main-nav');
const toggle = document.getElementById('nav-toggle');
if(toggle){
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

// fill footer year
document.getElementById('year').textContent = new Date().getFullYear();

// basic form validation helper (use on contact page)
function validateContactForm(form){
  const email = form.querySelector('input[name="email"]').value.trim();
  const message = form.querySelector('textarea[name="message"]').value.trim();
  if(!email || !message) {
    alert('Please provide both email and message.');
    return false;
  }
  // simple email check
  if(!/^\S+@\S+\.\S+$/.test(email)){
    alert('Please provide a valid email address.');
    return false;
  }
  return true;
}

// expose for inline onsubmit usage:
window.validateContactForm = validateContactForm;
