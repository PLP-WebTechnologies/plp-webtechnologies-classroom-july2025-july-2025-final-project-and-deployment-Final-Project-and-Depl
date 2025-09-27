document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navUl = document.querySelector("nav ul");
  menuToggle.addEventListener("click", () => {
    navUl.classList.toggle("show");
  });

  // Contact form handling
  const form = document.getElementById("contact-form");
  const responseDiv = document.getElementById("form-response");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        showResponse("Please fill in all required fields.", false);
        return;
      }

      if (!validateEmail(email)) {
        showResponse("Please enter a valid email address.", false);
        return;
      }

      // Simulate async send (you’d integrate with backend or email service)
      setTimeout(() => {
        showResponse("Thank you! Your message has been sent.", true);
        form.reset();
      }, 500);
    });
  }

  function validateEmail(email) {
    // Simple email regex
    return /\S+@\S+\.\S+/.test(email);
  }

  function showResponse(msg, success) {
    responseDiv.classList.remove("hidden");
    responseDiv.textContent = msg;
    responseDiv.style.color = success ? "green" : "red";
  }
});
