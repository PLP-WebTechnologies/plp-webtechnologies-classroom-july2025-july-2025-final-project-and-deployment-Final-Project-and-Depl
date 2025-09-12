// Toggle mobile menu
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}

// Contact form validation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMsg");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name && email && message) {
        msg.textContent = "✅ Message sent successfully!";
        msg.style.color = "green";
        form.reset();
      } else {
        msg.textContent = "❌ Please fill in all fields.";
        msg.style.color = "red";
      }
    });
  }
});
