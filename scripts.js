// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if(target) target.scrollIntoView({ behavior:'smooth' });
  });
});

// Scroll to contact
function scrollToContact(){
  document.getElementById('contact').scrollIntoView({behavior:'smooth'});
}

// Contact form handler
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('message').value.trim();
  const status = document.getElementById('formStatus');

  if(!name || !email || !msg){
    status.textContent = "Please fill all fields.";
    return;
  }

  const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if(!re.test(email)){
    status.textContent = "Enter a valid email.";
    return;
  }

  status.textContent = "Thanks — copy this email to contact: asmeyb@gmail.com";
});
