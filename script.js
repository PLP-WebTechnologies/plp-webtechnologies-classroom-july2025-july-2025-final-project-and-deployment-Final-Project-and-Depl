// Image Slider
let slideIndex = 0;
const slides = ["images/waterfall.jpg","images/paris.jpg","images/maldives.jpg","images/safari.jpg","images/newyork.jpg","images/tokyo.jpg","images/rome.jpg","images/bali.jpg","images/dubai.jpg","images/london.jpg","images/sydney.jpg"];
const slide = document.getElementById("slide");

function showSlide() {
  slide.src = slides[slideIndex];
}
function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide();
}
function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide();
}
showSlide();

// Contact Form Validation
document.getElementById("contactForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();

  if (name && email && message) {
    document.getElementById("formMessage").textContent = "✅ Message sent successfully!";
    this.reset();
  } else {
    document.getElementById("formMessage").textContent = "Please fill out all fields.";
  }
});
