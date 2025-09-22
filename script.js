// Navbar toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// Slider
let slides = document.querySelectorAll('.slide');
let dots = document.querySelectorAll('.dot');
let index = 0;
let autoSlide;

// Show slide by index
function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.remove('active');
    dots[idx].classList.remove('active');
    if (idx === i) {
      slide.classList.add('active');
      dots[idx].classList.add('active');
    }
  });
  index = i;
}

// Next/Prev
function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}
function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

// Auto Slide
function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 4000);
}
function stopAutoSlide() {
  clearInterval(autoSlide);
}

// Events
document.querySelector('.next').addEventListener('click', () => {
  nextSlide();
  stopAutoSlide();
  startAutoSlide();
});
document.querySelector('.prev').addEventListener('click', () => {
  prevSlide();
  stopAutoSlide();
  startAutoSlide();
});
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showSlide(i);
    stopAutoSlide();
    startAutoSlide();
  });
});

// Init
showSlide(index);
startAutoSlide();

// Contact form validation
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email && message) {
      formMessage.textContent = "✅ Message sent successfully!";
      formMessage.style.color = "green";
      form.reset();
    } else {
      formMessage.textContent = "❌ Please fill in all fields.";
      formMessage.style.color = "red";
    }
  });
}
